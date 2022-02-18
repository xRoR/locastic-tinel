import DatePicker from 'react-datepicker';
import { ReactElement, useCallback, useMemo, useReducer, useState } from 'react';
import styled from 'styled-components';
import checkmark from '../assets/icons/ic-checkmark.svg';
import { ReactComponent as Calendar } from '../assets/icons/ic-calendar-input.svg';
import { colors } from '../resources/colors';

import 'react-datepicker/dist/react-datepicker.css';

const FormFeedback = styled.div`
  margin-left: auto;
  text-align: rigth;

  font-weight: 600;
  font-size: 15px;
  line-height: 125%;

  color: #ff392e;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
  position: relative;
`;

const FormText = styled.div`
  font-size: 12px;
`;

const Input = styled.input<{ invalid?: boolean; withIcon?: boolean }>`
  width: 100%;
  font-size: 18px;
  line-height: 150%;
  padding: ${({ withIcon }) => (withIcon ? '14px 20px 14px 40px' : '14px 20px')};
  outline: none;
  box-sizing: border-box;

  color: ${colors.lightGrey};
  border: none;
  border-radius: 0;
  border-bottom: 2px solid ${colors.darkerGrey};

  &:hover {
    color: ${colors.darkerGrey};
    border-color: ${colors.blue};
  }
  &:focus {
    color: ${colors.darkerGrey};
    border-color: ${colors.blue};
    background-color: ${colors.lighterGrey};
    outline: none;
  }

  &.filled {
    background-color: ${colors.lighterGrey};
    color: ${colors.darkerGrey};
  }
`;

const CalendarIcon = styled(Calendar)`
  z-index: 100;
  position: absolute;
  left: 10px;
  bottom: 19px;
`;

const Label = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LabelText = styled.h6``;

const CheckboxLabel = styled.label`
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:before {
    content: '';
    width: 32px;
    height: 32px;
    border: 2px solid ${colors.blue};
    display: inline-block;
    border-radius: 6px;
    margin-right: 10px;
  }
`;

const CheckboxInput = styled.input<{ invalid: boolean }>`
  margin-bottom: 5px;
  visibility: hidden;

  &:checked + ${CheckboxLabel} {
    &:before {
      background-color: ${colors.blue};
      background-image: url(${checkmark});
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
`;

const Select = styled.select`
  width: 100%;
  font-size: 18px;
  padding: 16px 0px 17px;
  outline: none;
  box-sizing: border-box;
  height: 60px;

  color: ${colors.lightGrey};
  border: none;
  border-radius: 0;
  border-bottom: 2px solid ${colors.darkerGrey};

  &:hover {
    color: ${colors.darkerGrey};
    border-color: ${colors.blue};
  }
`;

export interface FormField {
  name: string;
  lable: string;
  value: string | number | boolean;
  type: 'text' | 'password' | 'checkbox' | 'select' | 'date';
  info?: string;
  error?: string;
  options?: string[];
}

export type UseFormFields = (FormField | FormField[])[];

interface UseFormProps {
  fields?: {
    [key: string]: string | number | boolean;
  };
  validate?: (name: string, value: any, values?: any[]) => any;
  formFields: UseFormFields;
}

export const useForm = ({ fields, validate, formFields }: UseFormProps) => {
  const flatFields = useCallback(
    (formFields, defaultValues = {}) =>
      formFields.reduce(
        (s: any, item: { name: string | number; default: any }) => ({
          ...s,
          [item.name]: defaultValues[item.name] ? defaultValues[item.name] : item.default ?? '',
        }),
        {}
      ),
    []
  );

  const [fieldsObject] = useState(() => {
    if (fields) return fields;
    if (formFields) {
      return flatFields(formFields);
    }
    return {};
  });

  const initial = useMemo(
    () => ({
      values: {
        ...fieldsObject,
      },
      errors: Object.keys(fieldsObject).reduce((payload, field) => ({ ...payload, [field]: false }), {}),
      ready: false,
      pristine: true,
      datePickerShown: false,
      isValid: true,
    }),
    [fieldsObject]
  );

  function formReducer(state: any, action: any) {
    switch (action.type) {
      case 'READY':
        return { ...state, ready: true };
      case 'UPDATE_FIELD':
        return {
          ...state,
          values: { ...state.values, ...action.payload },
          pristine: false,
          datePickerShown: false,
        };
      case 'SET_ERRORS':
        return { ...state, errors: { ...state.errors, ...action.payload } };
      case 'UPDATE_VALID_STATE':
        const isValid = () => {
          if (Object.values(state.errors).filter((i) => i).length > 0) return false;
          if (Object.values(state.values).filter((i) => i !== '').length === 0) return false;
          return true;
        };
        return { ...state, isValid: isValid() };
      case 'SET_DATEPICKER':
        return { ...state, datePickerShown: action.payload };
      case 'CLEAN_FORM':
        return initial;
      default:
        return state;
    }
  }

  const [formState, dispatch] = useReducer(formReducer, initial);
  const { values, errors } = formState;

  const handleFieldChange = useCallback(
    (e) => {
      const { name, value, checked, type } = e.target;
      const fieldValue = type === 'checkbox' ? checked : value;
      dispatch({
        type: 'UPDATE_FIELD',
        payload: { [name]: fieldValue },
      });
      if (validate) {
        dispatch({
          type: 'SET_ERRORS',
          payload: { ...validate(name, fieldValue, values) },
        });
        dispatch({
          type: 'UPDATE_VALID_STATE',
        });
      }
    },
    [dispatch, validate, values]
  );

  const checkValidity = useCallback(() => {
    if (Object.values(errors).filter((i) => i).length > 0) return false;
    if (Object.values(values).filter((i) => i !== '').length === 0) return false;
    return true;
  }, [errors, values]);

  const validateForm = useCallback(() => {
    let errors = {};
    for (const [key, value] of Object.entries(values)) {
      errors = {...errors, ...validate?.(key, value, values)}
    }
    dispatch({
      type: 'SET_ERRORS',
      payload: errors,
    });
    dispatch({
      type: 'UPDATE_VALID_STATE',
    });

    return Object.values(errors).filter(i => i).length === 0;
  }, [values, validate]);

  const renderField = (field: FormField, index: number | string): ReactElement<any, any> => {
    switch (field.type) {
      case 'checkbox':
        return (
          <FormGroup key={index}>
            {typeof errors[field.name] === 'string' && <FormFeedback>{errors[field.name]}</FormFeedback>}
            <CheckboxInput
              id={`checkbox${field.name}`}
              name={field.name}
              checked={values[field.name]}
              type={field.type}
              onChange={handleFieldChange}
              invalid={errors[field.name] !== false}
              className={!!values[field.name] ? 'filled' : undefined}
            />
            <CheckboxLabel htmlFor={`checkbox${field.name}`}>{field.lable}</CheckboxLabel>
            {field.info && <FormText>{field.info}</FormText>}
          </FormGroup>
        );
      case 'date':
        return (
          <FormGroup key={index}>
            <Label>
              <LabelText>{field.lable}</LabelText>
              {typeof errors[field.name] === 'string' && <FormFeedback>{errors[field.name]}</FormFeedback>}
            </Label>
            <CalendarIcon />
            <DatePicker
              customInput={
                <Input
                  withIcon={true}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleFieldChange}
                  invalid={errors[field.name] !== false}
                  className={!!values[field.name] ? 'filled' : undefined}
                />
              }
              dateFormat={'dd.MM.yyyy'}
              selected={values[field.name]}
              onChange={(date) => {
                dispatch({
                  type: 'UPDATE_FIELD',
                  payload: { [field.name]: date },
                });
              }}
            />
          </FormGroup>
        );
      case 'select':
        return (
          <FormGroup key={index}>
            <Label>
              <LabelText>{field.lable}</LabelText>
              {typeof errors[field.name] === 'string' && <FormFeedback>{errors[field.name]}</FormFeedback>}
            </Label>
            <Select>
              {field.options?.map((option, index) => {
                return (
                  <option key={`${field.name}_${index}`} value={option}>
                    {option}
                  </option>
                );
              })}
            </Select>
          </FormGroup>
        );
      default:
        return (
          <FormGroup key={index}>
            <Label>
              <LabelText>{field.lable}</LabelText>
              {typeof errors[field.name] === 'string' && <FormFeedback>{errors[field.name]}</FormFeedback>}
            </Label>
            <Input
              name={field.name}
              value={values[field.name]}
              type={field.type}
              onChange={handleFieldChange}
              invalid={errors[field.name] !== false}
              className={!!values[field.name] ? 'filled' : undefined}
            />
            {field.info && <FormText>{field.info}</FormText>}
          </FormGroup>
        );
    }
  };

  return { formState, dispatch, handleFieldChange, renderField, flatFields, checkValidity, validateForm };
};

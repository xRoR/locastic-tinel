import React, { useCallback } from 'react';
import styled from 'styled-components';
import { device } from '../../resources/values';
import { useForm, UseFormFields } from '../../utils/useForm';
import Btn from '../partials/Btn';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: red;
  border-radius: 6px;
  background-color: #ffc5c5;
  text-align: center;
  padding: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

export const Col = styled.div`
  flex: 1;
`;

const CheckoutForm: React.FC<{ onSubmit: (values: any) => void }> = ({ onSubmit }) => {
  /** Form */
  const validate = (field: string, value: string, form: any) => {
    switch (field) {
      case 'email':
        if (!value || value.length === 0) {
          return { [field]: 'Enter email' };
        }
        if (
          !String(value)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          return { [field]: 'Enter correct email' };
        }
        break;
      case 'secondtName':
      case 'firstName':
        if (!value || value.length === 0) {
          return { [field]: 'Enter name' };
        }
        if (
          !String(value)
            .toLowerCase()
            .match(/^([^0-9]*)$/)
        ) {
          return { [field]: 'Name can`t contain any numbers' };
        }
        break;
      case 'agree':
        if (!value) {
          return { [field]: 'Confirm agreedment' };
        }
        break;
      default:
        break;
    }
    return { [field]: false };
  };

  const formFields: UseFormFields = [
    {
      name: 'firstName',
      lable: 'First Name',
      value: '',
      type: 'text',
    },
    {
      name: 'secondName',
      lable: 'Second Name',
      value: '',
      type: 'text',
    },
    {
      name: 'email',
      lable: 'Email Address ',
      value: '',
      type: 'text',
    },
    [
      {
        name: 'date',
        lable: 'Date of Birth',
        value: '',
        type: 'date',
      },
      {
        name: 'gender',
        lable: 'Gender',
        value: 'other',
        type: 'select',
        options: ['other', 'man', 'woman'],
      },
    ],
    {
      name: 'address',
      lable: 'Address',
      value: '',
      type: 'text',
    },
    {
      name: 'zip',
      lable: 'Zip Code',
      value: '',
      type: 'text',
    },
    {
      name: 'agree',
      lable: 'I agree',
      value: false,
      type: 'checkbox',
    },
  ];

  const { formState, renderField, validateForm } = useForm({
    formFields,
    validate,
  });

  const { isValid } = formState;

  /** Fn */
  const submit = useCallback(async () => {
    if (!validateForm()) return;

    const { values } = formState;

    if (typeof onSubmit === 'function') onSubmit(values);
  }, [formState, onSubmit, validateForm]);


  return (
    <FormWrapper>
      {formFields.map((field, index) => {
        if (Array.isArray(field)) {
          return (
            <Row key={`row_${index}`}>
              {field.map((subField, subIndex) => (
                <Col key={`col_${index}_${subIndex}`}>{renderField(subField, `${index}_${subIndex}`)}</Col>
              ))}
            </Row>
          );
        }
        return renderField(field, index);
      })}
      {!isValid ? <ErrorMessage>Please fill up all necessary fields</ErrorMessage> : null}
      <Btn disabled={!isValid} onClick={submit}>
        Checkout
      </Btn>
    </FormWrapper>
  );
};

export default CheckoutForm;

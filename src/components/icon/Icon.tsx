import React from 'react'

import {ReactComponent as Design } from '../../assets/icons/categories/ic-design.svg';
import {ReactComponent as Backend } from '../../assets/icons/categories/ic-backend.svg';
import {ReactComponent as Frontend } from '../../assets/icons/categories/ic-frontend.svg';
import {ReactComponent as Marketing } from '../../assets/icons/categories/ic-marketing.svg';
import { colors } from '../../resources/colors';

const icons:{ [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>} = {
    design: Design,
    backend: Backend,
    frontend: Frontend,
    marketing: Marketing,
};

interface IconProps {
    icon: string;
    color?: string;
}

const Icon: React.FC<IconProps> = ({icon, color = colors.darkerGrey}) => {
  const Icon = icons[icon];
  if (!Icon) return null;
  return <Icon fill={color} />
}

export default Icon
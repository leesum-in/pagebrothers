// MockFormProvider.tsx
import React, { createContext, useContext } from 'react';

// react-hook-form을 모방한 간단한 컨텍스트
const FormContext = createContext({
  register: () => {},
  handleSubmit: (fn: (values: Record<string, unknown>) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    fn({});
  },
  setValue: () => {},
  watch: () => {},
});

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

interface ControllerFieldProps {
  field: {
    value?: unknown;
    onChange?: (value: unknown) => void;
    onBlur?: () => void;
    name?: string;
  };
}

export const Controller = ({
  render,
}: {
  render: (props: ControllerFieldProps) => React.ReactNode;
}) => render({ field: {} });

export const useForm = () => ({
  register: () => {},
  handleSubmit: (fn: (values: Record<string, unknown>) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    fn({});
  },
  setValue: () => {},
  watch: () => {},
});

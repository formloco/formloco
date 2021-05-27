export interface AppState {
  identified: boolean;
  page: string;
  childPage: string;
  childPageLabel: string;
  user: {};
  darkMode: boolean;
  tenant: {};
  signIn: boolean;
  selectedForm: Form
}

export interface Form {
  id: string
  name: string
  icon: string
  type: string
  description: string
  formObject: {}
}

export const FORM_EMPTY = <Form> {
  id: '',
  name: '',
  icon: '',
  description: '',
  formObject: {}
}
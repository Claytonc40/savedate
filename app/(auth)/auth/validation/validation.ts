export const nameValidation = { required: true, maxLength: 30 };

export const emailValidation = {
  required: 'E-mail é obrigatório',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Endereço de e-mail inválido',
  },
};

export const passwordValidation = {
  required: 'Senha é necessária',
  pattern: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    message: 'Senha inválida. Certifique-se de que ela atenda a todos os requisitos.',
  },
};

export const phoneValidation = {
  required: 'Telefone é necessária',
  pattern: {
    value: /^(\+?|0)[\d\-\+\s]{9,15}$/,
    message: 'Número de telefone inválido. Adicione um válido.',
  },
};

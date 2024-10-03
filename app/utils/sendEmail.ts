import nodemailer from 'nodemailer';

const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    // Log para verificar se as variáveis de ambiente estão sendo carregadas corretamente
    console.log('Iniciando o processo de envio de e-mail');
    console.log('SMTP_USER:', process.env.EMAIL_USERNAME);
    console.log('SMTP_FROM:', process.env.EMAIL_FROM);
    console.log('SMTP_FROM:', process.env.EMAIL_PASSWORD);

    // Configure seu transportador SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Usando TLS
      secure: false, // Use TLS
      auth: {
        user: 'hoodwood30@gmail.com', // Verifique se essa variável está definida
        pass: 'tsdp tugm bvmy ofvk', // Verifique se essa variável está definida
      },
    });

    // Log para verificar se o transporter foi criado corretamente
    console.log('Transporter configurado com sucesso');

    // Opções de e-mail
    const mailOptions = {
      from: process.env.EMAIL_FROM, // Endereço do remetente
      to, // Lista de destinatários
      subject, // Assunto
      text, // Texto simples
      html, // Corpo HTML (opcional)
    };

    // Log para exibir as opções de e-mail
    console.log('Opções de e-mail:', mailOptions);

    // Enviar o e-mail
    const info = await transporter.sendMail(mailOptions);

    // Log para confirmar o envio do e-mail
    console.log('E-mail enviado com sucesso:', info);
    return info;
  } catch (error) {
    // Log para capturar qualquer erro que ocorrer
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Erro ao enviar o e-mail');
  }
};

export default sendEmail;

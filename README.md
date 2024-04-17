# Fala Vereador

Esse aplicativo tem por finalidade facilitar a comunicação entre vereadores e cidadãos, possibilitando que os usuários enviem solicitações de diversos tipos para os vereadores cadastrados na plataforma. 
Será um App para dispositivos móveis Android e iOS, cuja distribuição será feita na PlayStore e na AppleStore.

## Sobre o Projeto

O projeto está sendo desenvolvido em React Native (versão mais recente) com TypeScript. Até o momento, o desenvolvimento tem sido direcionado exclusivamente para Android, e ainda não foi testado para iOS.
Após a conclusão de sua versão Android, será iniciada a etapa de desenvolvimento para iOS, que requerirá uma máquina com macOS e a IDE Xcode para gerar o APK. A espectativa é de que poucos ajustes sejam 
necessários nessa etapa, visto que o React Native é uma biblioteca multiplataforma.

## Funcionalidades

- **Cadastro de Usuários:** Cidadãos poderão criar uma conta para acessar o aplicativo através de um formulário que será acessível via botão na tela de login.
- **Envio de Solicitações:** Os usuários poderão enviar uma solicitação semelhante a um e-mail para qualquer vereador cadastrado na plataforma.
- **Acompanhamento de Solicitações:** Será possível acompanhar as solicitações abertas através de uma lista na tela inicial contendo informações gerais e status.
- **Chat:** Ao clicar em uma solicitação, será aberta uma tela de chat, por onde o usuário poderá se comunicar com o vereador, enviar anexos e verificar o andamento da solicitação.
- **Recuperação de Senha:** Usuários poderão recuperar suas senhas através do e-mail cadastrado.

## Tecnologias Utilizadas

- **Axios e Tanstack Query:** As duas são usadas para configurar a parte de requisições para a API. O Axios lida com interceptores, cookies, URL base etc., enquanto o Tanstack Query é usado para organizar
as requisições de forma geral, encapsulando toda essa lógica.
- **NativeWind:** Usado para a parte de estilização. Foi uma tentativa de trabalhar com algo semelhante ao TailWind, que é uma excelente biblioteca do React. A funcionalidade é bastante semelhante, mas faltam
muitas das funcionalidades existentes no TailWind.

## Executando o Projeto

Para executar o projeto para Android, é necessário ter o Android Studio instalado na máquina e realizar uma série de configurações descritas na documentação do React Native. Pra ser sincero é um processo bem chato.
Já para iOS eu não faço ideia ainda, só sei que precisa do Xcode, porém a documentação deve explicar certinho o processo.

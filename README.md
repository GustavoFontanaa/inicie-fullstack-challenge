# Projeto Fullstack: Angular + Laravel + Node.js

Este projeto é composto por três aplicações distintas que trabalham juntas:

1. Backend (API REST) em Laravel
2. Frontend (Interface Web) em Angular
3. Servidor Node.js (WebSocket ou serviço em tempo real)

---

## Requisitos

- Node.js: v22.17.0
- PHP: v8.3.6
- Composer: v2.7.1
- Angular CLI: v20.1.1

---

## Como iniciar o projeto

### Backend - Laravel

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend - Angular

```bash
npm install
ng serve
```

### Servidor - Node.js

```bash
npm install
node server.js
```

### Credenciais de acesso
```bash
Email: admin@admin.com
Senha: admin123
```

### Primeiro acesso
Ao fazer login pela primeira vez com um usuário novo, o sistema exigirá a redefinição de senha.
Basta tentar fazer login com o novo usuário que será redirecionado para redefinir a senha.
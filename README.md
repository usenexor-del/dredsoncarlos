# Dr. Edson Carlos — Plataforma de Agendamento Premium

Sistema de agendamento online para harmonização facial do Dr. Edson Carlos (Tatuapé, SP).

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** (ícones)
- Deploy: **Vercel**

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page completa |
| `/agendamento` | Agendamento online com calendário |
| `/admin` | Painel administrativo |
| `/fidelidade` | Programa VIP de pontos |

## Como subir no GitHub + Vercel

### 1. Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome: `dredsoncarlos` (ou outro de sua preferência)
3. Deixe **privado** e clique em **Create repository**

### 2. Subir o código

Abra o terminal na pasta do projeto e execute:

\`\`\`bash
git init
git add .
git commit -m "feat: plataforma de agendamento Dr. Edson Carlos"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/dredsoncarlos.git
git push -u origin main
\`\`\`

### 3. Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `dredsoncarlos`
4. Clique em **Deploy**
5. Pronto! Em ~2 minutos o site estará no ar.

### 4. Domínio personalizado (opcional)

Na Vercel: **Settings → Domains → Add domain**  
Ex: `dredsoncarlos.com.br`

## Desenvolvimento local

\`\`\`bash
npm install
npm run dev
\`\`\`

Abra [http://localhost:3000](http://localhost:3000)

## Personalização

- **Dados da clínica**: edite `src/lib/data.ts`
- **Cores**: edite `tailwind.config.ts`
- **Estilos globais**: edite `src/app/globals.css`
- **Textos e procedimentos**: `src/lib/data.ts`

---

**@dredsoncarlos** · Tatuapé, São Paulo

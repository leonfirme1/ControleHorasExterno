# Deploy Direto no Railway - Passo a Passo

Como a opção de deploy externo não está disponível na interface atual do Replit, vamos fazer o deploy diretamente no Railway.

## Passo 1: Preparar o Código no GitHub

### Opção A: Se você já tem GitHub conectado
1. No Replit, vá em **Tools** → **Git**
2. Faça commit das mudanças
3. Push para o repositório GitHub

### Opção B: Criar novo repositório
1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"**
3. Nome: `gestao-horas` (ou outro nome)
4. Deixe **público** ou **privado** (sua escolha)
5. **NÃO** marque "Initialize with README"
6. Clique **"Create repository"**

### Opção C: Download e Upload Manual
1. No Replit: **Shell** → digite `zip -r projeto.zip . -x node_modules/\*`
2. Download do arquivo `projeto.zip`
3. Extrair e subir para GitHub manualmente

## Passo 2: Deploy no Railway

1. **Acesse [railway.app](https://railway.app)**
2. **Login** com GitHub ou email
3. **"New Project"**
4. **"Deploy from GitHub repo"**
5. **Selecione seu repositório** `gestao-horas`
6. Railway detectará automaticamente que é Node.js

## Passo 3: Configurar PostgreSQL

1. No dashboard do projeto Railway
2. **"+ New"** → **"Database"** → **"PostgreSQL"**
3. Railway criará automaticamente `DATABASE_URL`

## Passo 4: Configurar Variáveis

No painel do Railway, adicionar:
```
NODE_ENV=production
```

## Passo 5: Deploy Automático

Railway executará automaticamente:
- `npm ci` (instalar dependências)
- `npm run build` (build da aplicação)  
- `npm run start` (iniciar servidor)

## Passo 6: Configurar Base de Dados

Após o deploy, executar migrações:
1. No Railway, vá em **"PostgreSQL"** → **"Data"**
2. Execute as migrações necessárias ou use o comando `npm run db:push`

## Resultado Final

- **URL automática**: `sua-app.railway.app`
- **PostgreSQL**: Configurado automaticamente
- **SSL**: Habilitado por padrão
- **Deploy contínuo**: A cada push no GitHub

## Troubleshooting

### Se o build falhar:
- Verifique os logs no Railway
- Confirme que `package.json` tem todos os scripts

### Se a base de dados não conectar:
- Verifique se `DATABASE_URL` está definida
- Execute `npm run db:push` para sincronizar schema

### Se a aplicação não iniciar:
- Verifique se a porta está configurada corretamente
- Confirme que `npm run start` funciona

## Arquivos Já Preparados

Sua aplicação já tem todos os arquivos necessários:
✓ `railway.json` - Configuração Railway
✓ `nixpacks.toml` - Build configuration  
✓ `Procfile` - Process definition
✓ `.env.example` - Environment template
✓ Servidor configurado para porta dinâmica

Tudo está pronto para o deploy!
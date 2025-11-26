# 📌 API de Tarefas com Express, MongoDB e JWT

Projeto de backend desenvolvido em Node.js com Express para gerenciamento de tarefas. A API segue boas práticas REST, possui autenticação JWT, validações robustas, documentação Swagger e testes automatizados com Jest e Supertest.

---

## 🧠 Visão geral

- **Entidade principal:** Tarefa
- **Entidade de suporte:** Usuário (autenticação e autorização)
- **Banco de dados:** MongoDB (via Mongoose)
- **Autenticação:** JWT (protege rotas de escrita)
- **Validações:** Joi + regras de negócio no Mongoose
- **Documentação:** Swagger (OpenAPI)
- **Testes:** Jest + Supertest
- **Versionamento:** `/api/v1`

---

## 📁 Estrutura do projeto

api-tarefas/ 
├─ src/ │ 
├─ config/ # Conexão com MongoDB │ 
├─ controllers/ # Regras de negócio │ 
├─ middlewares/ # Autenticação e validação │ 
├─ models/ # Schemas Mongoose │ 
├─ routes/ # Rotas da API │ 
├─ validations/ # Joi schemas │ 
├─ docs/ # Swagger (openapi.yaml) 
│ └─ app.js # Configuração principal 
├─ tests/ # Testes com Jest e Supertest 
├─ .env # Variáveis de ambiente 
├─ package.json # Dependências e scripts 
├─ jest.config.js # Configuração de testes 
└─ README.md # Este arquivo


---

## 📦 Dependências

### Principais
| Pacote               | Função                                 |
|----------------------|----------------------------------------|
| `express`            | Framework da API RESTful               |
| `mongoose`           | ODM para MongoDB                       |
| `jsonwebtoken`       | Geração e verificação de tokens JWT    |
| `bcryptjs`           | Criptografia de senhas                 |
| `dotenv`             | Variáveis de ambiente                  |
| `cors`               | Permitir requisições externas          |

### Validações
| Pacote   | Função                                  |
|----------|------------------------------------------|
| `joi`    | Validação de dados de entrada            |

### Documentação
| Pacote                | Função                                      |
|-----------------------|----------------------------------------------|
| `swagger-ui-express`  | Exibir documentação Swagger via navegador    |
| `js-yaml`             | Ler arquivos YAML para Swagger               |

### Testes
| Pacote       | Função                                           |
|--------------|--------------------------------------------------|
| `jest`       | Framework de testes                              |
| `supertest`  | Testar rotas HTTP simulando requisições          |
| `nodemon`    | Reiniciar servidor automaticamente em dev        |

### Instalação
```bash
npm install express mongoose jsonwebtoken bcryptjs dotenv cors joi swagger-ui-express js-yaml
npm install --save-dev jest supertest nodemon

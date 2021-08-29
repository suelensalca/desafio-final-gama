const swaggerAutogen = require('swagger-autogen')()

const outputFile = './routes/swagger_output.json'
const endpointsFiles = ['./routes/api.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "JobsNET API by Suelen",
        description: "Documentação gerada automaticamente por <b>swagger-autogen</b> para a API de cadastro de candidatos do programa Start Tech."
    },
    host:  process.env.BASE_URL,
    basePath: "/api",
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Candidatos",
            "description": "Endpoints"
        }
    ],
    definitions: {
        Candidato: {
            cpf:"00000000000", 
            nome:"Nome Ficticio", 
            cargo:"Desenvolvedor", 
            data_nascimento:"1999-02-08", 
            estado_civil:"Casado(a)", 
            sexo:"Feminino", 
            cep:"00000-000", 
            endereco:"Rua Nome", 
            bairro:"Bairro", 
            cidade:"Cidade", 
            estado:"Estado", 
            telefone_fixo:"(00)0000-0000", 
            celular:"(11)1111-1111", 
            email:"email@email.com", 
            identidade:"12311111", 
            possui_veiculo:"1", 
            possui_habilitacao:"1", 
        },
        ListaCandidato: {
            "status": 200,
            "data": [{
                "nome": "Nome Ficticio",
                "email": "email@email.com"
            }]
        },
        CandidatoCadastrado: {
            "status": 200,
            "data": {
              "nome": "Nome Ficticio",
              "cargo": "Desenvolvedor",
              "data_nascimento": "1999-02-08",
              "estado_civil": "Casado(a)",
              "sexo": "Feminino",
              "cep": "00000000",
              "endereco": "Rua Nome",
              "bairro": "Bairro",
              "cidade": "Cidade",
              "estado": "Estado",
              "telefone_fixo": "(00)00000000",
              "celular": "(00)00000000",
              "email": "email@email.com.br",
              "identidade": "000000000",
              "cpf": "00000000000",
              "possui_veiculo": "1",
              "possui_habilitacao": "1"
            }
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)
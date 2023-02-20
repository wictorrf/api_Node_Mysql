const CarroService = require("../services/carroService");

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {error: '', result:[]};

        let carros = await CarroService.buscarTodos();

        for(let i in carros){
            json.result.push({
                codigo: carros[i].codigo,
                descricao: carros[i].modelo,
                placa: carros[i].placa
            });
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = {error: '', result:{}};

        let codigo = req.params.codigo;
        let carro = await CarroService.buscarUm(codigo);

        try {
            json.result = carro;
            res.json(json);
        } catch (error) {
            console.log(error);
        }
    },

    inserirCarro: async (req, res) => {
        let json = {error: '', result:{}};

        let modelo = req.body.modelo;
        let placa = req.body.placa;

        if (modelo && placa) {
            let carroCodigo = await CarroService.inserirCarro(modelo, placa);
            json.result = {
                codigo: carroCodigo,
                modelo,
                placa
            }
        } else {
            json.error = "Campos nao enviados!";
        }
        res.json(json);
    },

    alterarCarro: async (req, res) => {
        let json = {error: '', result:{}};

        let codigo = req.params.codigo
        let modelo = req.body.modelo;
        let placa = req.body.placa;

        if (codigo && modelo && placa) {
            await CarroService.alterarCarro(codigo, modelo, placa);
            json.result = {
                codigo,
                modelo,
                placa
            }
        } else {
            json.error = "Campos nao Atualizados!";
        }
        res.json(json);
    },

    deletarCarro: async (req, res) => {
        let json = {error: '', result:{}};

        let codigo = req.params.codigo;
        let carro = await CarroService.deletarCarro(codigo);
        
        try {
            json.result = carro;
            res.json(json);
        } catch (error) {
            json.result = "Nao foi possivel deletar o item!";
        }
    }
}
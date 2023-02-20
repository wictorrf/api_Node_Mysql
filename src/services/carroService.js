const db = require("../db");

module.exports = {

    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM carros', (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                } else {
                    aceito(results);
                }
            });
        });
    },
    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado) =>{
            db.query('SELECT * FROM carros WHERE codigo = ?', [codigo], (reject, resolve) => {
                if(reject){
                    rejeitado(reject);
                    return;
                }else{
                    aceito(resolve);
                }
                resolve.length > 0 ? aceito(resolve[0]) : aceito(false);
            });
        });
    },

    inserirCarro: (modelo, placa) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO carros (modelo, placa) VALUES (?, ?)',
             [modelo, placa],
              (reject, resolve) => {
                if (reject) {
                    rejeitado(reject); return;
                } 
                aceito(resolve.insertCodigo);
            });
        });
    },

    alterarCarro: (codigo, modelo, placa) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE carros SET modelo = ?, placa = ? WHERE codigo = ?',
             [modelo, placa, codigo],
              (reject, resolve) => {
                if (reject) {
                    rejeitado(reject); return;
                } 
                aceito(resolve);
            });
        });
    },

    deletarCarro: (codigo) => {

        return new Promise((res, rej) => {
            db.query('DELETE FROM carros WHERE codigo = ?', [codigo], (reject, resolve) => {
                if(reject){
                    rej(reject);
                    return;
                }else{
                    res(resolve);
                }
            });
        });
    }    
};
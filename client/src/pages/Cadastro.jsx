// Cadastro.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
    const navigate = useNavigate();
    const [categoria, setCategoria] = useState("ONG");
    const [formData, setFormData] = useState({
        email: "",
        senha: "",
        confirmarSenha: "",
        nome_org: "",
        CNPJ: "",
        telefone: "",
        descricao: "",
        tipo_servico: "Não Retira",
        endereco: "",
        cep: "",
        cidade: "",
        estado: "",
        materiais: [],
        tipo_transacao: "Compra",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            materiais: checked
                ? [...prevData.materiais, value]
                : prevData.materiais.filter((item) => item !== value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fk_id_categoria = categoria === "ONG" ? 2 : 1;

        // Valida se as senhas correspondem
        if (formData.senha !== formData.confirmarSenha) {
            alert("As senhas não coincidem. Por favor, tente novamente.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/cadastrar", {
                ...formData,
                fk_id_categoria,
                status_usuario: false,
            });

            // Redireciona o usuário para o perfil após o cadastro
            navigate("/perfil");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="cadastro-container">
            <h2>Cadastro de {categoria}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tipo de Cadastro:
                    <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="ONG">ONG</option>
                        <option value="Empresa">Empresa</option>
                    </select>
                </label>

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Senha:</label>
                <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />

                <label>Confirme a Senha:</label>
                <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required />

                <label>Nome da Organização:</label>
                <input type="text" name="nome_org" value={formData.nome_org} onChange={handleChange} required />

                <label>CNPJ:</label>
                <input type="text" name="CNPJ" value={formData.CNPJ} onChange={handleChange} required />

                <label>Telefone:</label>
                <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />

                <label>Descrição:</label>
                <textarea name="descricao" value={formData.descricao} onChange={handleChange} />

                <label>Tipo de Serviço:</label>
                <select name="tipo_servico" value={formData.tipo_servico} onChange={handleChange}>
                    <option value="Retira no Local">Retira no Local</option>
                    <option value="Não Retira">Não Retira</option>
                </select>

                <label>Endereço:</label>
                <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} required />

                <label>CEP:</label>
                <input type="text" name="cep" value={formData.cep} onChange={handleChange} required />

                <label>Cidade:</label>
                <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} required />

                <label>Estado:</label>
                <input type="text" name="estado" value={formData.estado} onChange={handleChange} required />

                <label>Tipos de Material Aceito:</label>
                <div className="material-options">
                    <label><input type="checkbox" value="Papelao" onChange={handleCheckboxChange} /> Papelão</label>
                    <label><input type="checkbox" value="Plastico" onChange={handleCheckboxChange} /> Plástico</label>
                    <label><input type="checkbox" value="Vidro" onChange={handleCheckboxChange} /> Vidro</label>
                    <label><input type="checkbox" value="Metal" onChange={handleCheckboxChange} /> Metal</label>
                    <label><input type="checkbox" value="Organico" onChange={handleCheckboxChange} /> Orgânico</label>
                    <label><input type="checkbox" value="Eletronico" onChange={handleCheckboxChange} /> Eletrônico</label>
                </div>

                {categoria === "Empresa" && (
                    <label>
                        Tipo de Transação:
                        <select name="tipo_transacao" value={formData.tipo_transacao} onChange={handleChange}>
                            <option value="Compra">Compra</option>
                            <option value="Venda">Venda</option>
                            <option value="Compra e Venda">Compra e Venda</option>
                        </select>
                    </label>
                )}

                <button type="submit">CADASTRAR</button>
            </form>
        </div>
    );
};

export default Cadastro;
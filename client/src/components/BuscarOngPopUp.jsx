// BuscarOngPopUp.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { googleMapsApiKey } from "./ChaveAPIGoogleMaps";

const BuscarOngPopUp = ({ onClose }) => {
    const [address, setAddress] = useState("");
    const [radius, setRadius] = useState(5);
    const [materials, setMaterials] = useState([]);
    const [serviceType, setServiceType] = useState("Retira no Local");
    const navigate = useNavigate();

    const handleMaterialChange = (event) => {
        const { value, checked } = event.target;
        setMaterials((prevMaterials) =>
            checked ? [...prevMaterials, value] : prevMaterials.filter((item) => item !== value)
        );
    };

    const handleSearch = async () => {
        try {
            // Geocodificação do endereço usando a API do Google Maps
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${googleMapsApiKey}`;
            const geocodeResponse = await axios.get(geocodeUrl);
            const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

            // Envio das coordenadas e outros parâmetros ao backend
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/buscar-ongs`, {
                latitude: lat,
                longitude: lng,
                raio: radius,
                materiais: materials,
                tipoServico: serviceType,
            });

            // Redireciona para a página de resultados com os dados obtidos
            navigate("/resultados-ongs", { state: { resultados: response.data, center: {lat, lng}, raio: radius}});
        } catch (error) {
            console.error("Erro ao buscar ONGs próximas:", error);
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                <div className="popup-content-title">
                <h1>Buscar ONGs</h1>
                </div>
                <label>Endereço:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Digite o endereço"
                />
                <label>Raio de Distância (km):</label>
                <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
                    <option value={5}>5 km</option>
                    <option value={10}>10 km</option>
                    <option value={20}>20 km</option>
                </select>
                <label>Tipos de Material:</label>
                <div className="material-checkboxes">
                    <label>
                        <input type="checkbox" value="12" onChange={handleMaterialChange} /> Papel
                    </label>
                    <label>
                        <input type="checkbox" value="1" onChange={handleMaterialChange} /> Papelão
                    </label>
                    <label>
                        <input type="checkbox" value="2" onChange={handleMaterialChange} /> Plástico
                    </label>
                    <label>
                        <input type="checkbox" value="3" onChange={handleMaterialChange} /> Vidro
                    </label>
                    <label>
                        <input type="checkbox" value="4" onChange={handleMaterialChange} /> Metal
                    </label>
                    <label>
                        <input type="checkbox" value="5" onChange={handleMaterialChange} /> Orgânico
                    </label>
                    <label>
                        <input type="checkbox" value="6" onChange={handleMaterialChange} /> Eletrônico
                    </label>
                    <label>
                        <input type="checkbox" value="7" onChange={handleMaterialChange} /> Roupa
                    </label>
                    <label>
                        <input type="checkbox" value="8" onChange={handleMaterialChange} /> Alimento
                    </label>
                    <label>
                        <input type="checkbox" value="9" onChange={handleMaterialChange} /> Brinquedo
                    </label>
                    <label>
                        <input type="checkbox" value="10" onChange={handleMaterialChange} /> Produto de Higiene
                    </label>
                    <label>
                        <input type="checkbox" value="11" onChange={handleMaterialChange} /> Móveis
                    </label>
                </div>
                <label>Tipo de Serviço:</label>
                <div className="radioEmpresa">
                    <label>
                        <input
                            type="radio"
                            name="serviceType"
                            value="Retira no Local"
                            checked={serviceType === "Retira no Local"}
                            onChange={() => setServiceType("Retira no Local")}
                        />
                        Retira no Local
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="serviceType"
                            value="Não Retira"
                            checked={serviceType === "Não Retira"}
                            onChange={() => setServiceType("Não Retira")}
                        />
                        Não Retira
                    </label>
                </div>
                <button onClick={handleSearch}>BUSCAR</button>
            </div>
        </div>
    );
};

export default BuscarOngPopUp;

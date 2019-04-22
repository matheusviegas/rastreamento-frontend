import React, { Component } from "react";
import api from "../../services/api";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";

import SweetAlert from "sweetalert-react";
import { Link } from "react-router-dom";

import { MdAddBox } from "react-icons/md";

import "sweetalert/dist/sweetalert.css";
import "./styles.css";

export default class Pacote extends Component {
  state = {
    pacote: null,
    local: "",
    tipo: "",
    showAlert: false
  };

  async componentDidMount() {
    const response = await api.get(`pacote/${this.props.match.params.codigo}`);
    console.log(response.data);
    this.setState({
      pacote: response.data
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    const response = await api.post(
      `pacote/${this.state.pacote.codigo}/atualizacao`,
      {
        local: this.state.local,
        tipo: this.state.tipo
      }
    );

    this.setState({
      tipo: "",
      local: "",
      pacote: {
        ...this.state.pacote,
        atualizacoes: [...this.state.pacote.atualizacoes, response.data]
      }
    });
  };

  handleInputChange = () => {};

  render() {
    return (
      <div id="box-container">
        {this.state.pacote == null && <h2>Pacote não encontrado.</h2>}
        <SweetAlert
          show={this.state.showAlert}
          title="Você tem certeza?"
          text="Esta ação não pode ser desfeita."
          showCancelButton
          confirmButtonText="Confirmar Exclusão"
          confirmButtonColor="#dc3545"
          cancelButtonText="Cancelar"
          type="warning"
          onConfirm={async () => {
            await api.delete(`pacote/${this.state.pacote.codigo}`);
            this.setState({ showAlert: false });
            this.props.history.goBack();
          }}
          onCancel={() => {
            this.setState({ showAlert: false });
          }}
          onClose={() => console.log("close")}
        />

        {this.state.pacote != null && (
          <header>
            <div className="top">
              <span className="logo">
                <Link to="/">Rastreamento</Link>
              </span>
              <h1>{this.state.pacote.codigo}</h1>
            </div>
            <button
              className="btnRemover"
              onClick={() => this.setState({ showAlert: true })}
            >
              Deletar
            </button>
          </header>
        )}

        {this.state.pacote != null && (
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Local atual"
              value={this.state.local}
              onChange={e => {
                this.setState({ local: e.target.value });
              }}
            />
            <input
              className="ml10"
              placeholder="Tipo de atualização"
              value={this.state.tipo}
              onChange={e => {
                this.setState({ tipo: e.target.value });
              }}
            />
            <button className="ml10" type="submit">
              Salvar
            </button>
          </form>
        )}

        {this.state.pacote != null && (
          <ul>
            {this.state.pacote.atualizacoes &&
              this.state.pacote.atualizacoes.map(atualizacao => (
                <li key={atualizacao._id}>
                  <strong>{atualizacao.local}</strong>
                  <div className="grupo-detalhes">
                    <span>{atualizacao.tipo}</span>
                    <span>
                      há{" "}
                      {distanceInWords(atualizacao.createdAt, new Date(), {
                        locale: pt
                      })}
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    );
  }
}

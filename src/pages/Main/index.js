import React, { Component } from "react";
import SweetAlert from "sweetalert-react";

import api from "../../services/api";

import "sweetalert/dist/sweetalert.css";
import "./styles.css";

export default class Main extends Component {
  state = {
    codigoPacote: "",
    showAlert: false
  };

  async componentDidMount() {
    const response = await api.get("pacote");

    this.setState({
      pacotes: response.data
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

    if (this.state.codigoPacote.length === 0) {
      return;
    }

    const buscaPacoteExistente = await api.get(
      `pacote/${this.state.codigoPacote}`
    );

    if (buscaPacoteExistente.data !== null) {
      this.setState({ showAlert: true });
      return;
    }

    const response = await api.post("pacote", {
      codigo: this.state.codigoPacote
    });

    this.props.history.push(`/pacote/${response.data.codigo}`);
  };

  handleInputChange = e => {
    this.setState({ codigoPacote: e.target.value });
  };

  render() {
    return (
      <div id="main-container">
        <SweetAlert
          show={this.state.showAlert}
          type="error"
          title="Ooops!"
          text="Este pacote já existe. Tente outro código."
          onConfirm={() => this.setState({ showAlert: false })}
        />

        <form onSubmit={this.handleSubmit}>
          <h1 className="titulo">Rastreamento</h1>
          <input
            placeholder="Código do pacote"
            value={this.state.codigoPacote}
            onChange={this.handleInputChange}
          />
          <button type="submit">Cadastrar</button>
        </form>

        <ul className="lista-pacotes">
          {this.state.pacotes &&
            this.state.pacotes.map(pacote => (
              <li key={pacote._id}>
                <a href={`/pacote/${pacote.codigo}`}>{pacote.codigo}</a>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

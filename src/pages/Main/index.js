import React, { Component } from "react";
import api from "../../services/api";

import "./styles.css";

export default class Main extends Component {
  state = {
    codigoPacote: ""
  };

  async componentDidMount() {
    const response = await api.get("pacote");

    this.setState({
      pacotes: response.data
    });
  }

  handleSubmit = async e => {
    e.preventDefault();

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
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Código do pacote"
            value={this.state.codigoPacote}
            onChange={this.handleInputChange}
          />
          <button type="submit">Salvar</button>
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

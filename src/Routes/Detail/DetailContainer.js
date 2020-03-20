import React from "react";
import DetailPresenter from "./DetailPresenter";
import { MoviesApi, TVApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result;
    try {
      if (isMovie) {
        result = await MoviesApi.movieDetail(parsedId);
        result = result.data;
      } else {
        result = await TVApi.showDetail(parsedId);
        result = result.data;
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({
        loading: false,
        result
      });
    }
    if (isMovie) {
    }
  }

  render() {
    console.log(this.state);
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}

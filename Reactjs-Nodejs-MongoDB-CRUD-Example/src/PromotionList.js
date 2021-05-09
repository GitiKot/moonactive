import React, { Component } from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import "./PromotionList.css";

class PromotionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      promotions: [],
      isLoading: true,
      lastScrollTop: 0,
      pageNo: 1,
    };
    this.remove = this.remove.bind(this);
    this.duplicate = this.duplicate.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(`api/promotions/${0}`)
      .then((response) => {
        response
          .json()
          .then((data) =>
            this.setState({ promotions: data, isLoading: false })
          );
      })
      .catch((error) => {
        alert("GET request failed");
      });

    fetch("api/fields")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ fields: data, isLoading: false, pageNo: 1 });
      });
  }

  makeData() {

    fetch("api/makeData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
    
    });
  }

  async remove(id) {
    await fetch(`/api/promotion/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      const updatedPromotions = [...this.state.promotions].filter(
        (i) => i._id !== id
      );
      this.setState({ promotions: updatedPromotions });
    });
  }
  async duplicate(id) {
    await fetch(`/api/promotion/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      const updatedPromotions = [...this.state.promotions]
     
      this.setState({ promotions: updatedPromotions });
    });
  }

  getDataDownScroll() {
    const pageNumber = this.state.pageNo;

    fetch(`api/promotions/${this.state.pageNo}`).then((response) => {
      response.json().then((data) => {
        if (!(JSON.stringify(data) === JSON.stringify([]))) {
          if (this.state.pageNo > pageNumber) {
            this.setState({
              promotions: this.state.promotions.concat(data),
              isLoading: false,
            });
            if (pageNumber > 2) {
              this.state.promotions.splice(0, 20);
            }
          } 
        } else {
          const pg = this.state.pageNo - 1;
          this.setState({ pageNo: pg });
        }
      });
    });
  }
  getDataUpScroll() {
    const pg = this.state.pageNo;
    if (pg < 0) {
      this.setState({ pageNo: 0 });
      this.state.pageNo = 0;
    } 
    else {

      fetch(`api/promotions/${this.state.pageNo}`).then((response) => {
        response.json().then((data) => {
          const DataArray = data.concat(this.state.promotions);
          this.setState({ promotions: DataArray, isLoading: false });

          this.state.promotions.splice(60, 20);
        });
      });

      const pg = this.state.pageNo + 3;
      this.setState({ pageNo: pg });
    }
  }

  firstEvent = (e) => {
    const st = e.target.scrollTop;
    if (st > this.state.lastScrollTop) {
      const bottom =
        e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
      if (bottom) {
        const pg = this.state.pageNo + 1;
        this.setState({ pageNo: pg });
        this.getDataDownScroll();
      }
    } else {
     
      const scrollBottom =
        e.target.scrollHeight - (e.target.scrollHeight - e.target.scrollTop) < 50;
      if (scrollBottom) {
        const pg = this.state.pageNo - 4;
        this.setState({ pageNo: pg });
        this.state.pageNo=pg;
        this.getDataUpScroll();
      }
    }
    this.setState({ lastScrollTop: st <= 0 ? 0 : st });
  };

  render() {
    const { fields, promotions, isLoading } = this.state;

    if (isLoading) {
      return <p> Loading... </p>;
    }
    const fieldsList = fields.map((a) =>
      a.fieldName.map((f) => <th>{f.nameField}</th>)
    );
    const promotionList = promotions.map((promotion) => {
      return (
        <tr key={promotion._id}>
          <td>
            <input type="checkbox" />
          </td>
          {fields.map((f) =>
            f.fieldName.map((name) => {
              if (name.type === "Date") {
                if (promotion[name.nameField])
                  return (
                    <td>
                      {new Date(promotion[name.nameField]).toLocaleDateString()}
                    </td>
                  );
                else {
                  return <td> {promotion[name.nameField]} </td>;
                }
              } else {
                return <td> {promotion[name.nameField]} </td>;
              }
            })
          )}
          <td>
            <ButtonGroup>
              <Button
                size="sm"
                color="primary"
                tag={Link}
                to={"/promotions/" + promotion._id}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="accent"
                onClick={() => this.duplicate(promotion._id)}
              >
                Duplicate
              </Button>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.remove(promotion._id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <div className="div" onScroll={this.firstEvent}>
        <Container fluid>
          <div className="float-right" className="nav">
            <Button onClick={this.makeData}> 10000 rows</Button>
            <Button color="success" tag={Link} to="/promotions/new">
              Add Promotion
            </Button>
          </div>
          <h3 className="title"> Promotion List </h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th>select</th>
                {fieldsList}
              </tr>
            </thead>
            <tbody> {promotionList}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default PromotionList;

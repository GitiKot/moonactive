import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
class makeData extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        fetch('../api/fields')
            .then(response => response.json())
            .then(data => { this.setState({ fields: data }) });

        // fetch('../api/promotions')
        // .then(response => response.json())
        // .then(data => this.setState({ promotions: data }));

       
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;

        await fetch('/api/promotion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/promotions');
    }

    render() {
        const { fields, item } = this.state;

        const title = < h2 > { item.id ? 'Edit Promotion' : 'Add Promotion' } </h2>;

        const promotionList = < div > {
            fields.map(f => f.fieldName.map(name => {
    
        return (
            <FormGroup >
            <Label
            for = { name.nameField } > { name.nameField } </Label>  
           < Input type = { name.type }
            name = { name.nameField }
            id = { name.nameField }
            value = { item[name.nameField] || '' }
            onChange = { this.handleChange }
            autoComplete = { name.nameField }
            />   
           </ FormGroup >

        )         
            }))
        } </div>

        return <div >

            <AppNavbar />
              <Container > { title } 
            <Form onSubmit = { this.handleSubmit } >

            { promotionList }

            </Form>  
         </Container >   
            </div>
    }
}

export default withRouter(makeData);
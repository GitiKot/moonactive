import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
class PromotionEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: [],
           item:''
        };
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

        if (this.props.match.params.id !== 'new') {
            const promotion = await (await fetch(`/api/promotion/${this.props.match.params.id}`)).json();
            this.setState({ item: promotion });
        }
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
            method: (item._id) ? 'PUT' : 'POST',
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
    //             console.log("name.type==='Date'",name.type==='Date');
    //             if(name.type==='Date'){
    //                 console.log("name.nameField",name.nameField,new Date(item[name.nameField]).toLocaleDateString());
    //                 if(item[name.nameField])
    //    return ( 
    //     <FormGroup >
    //     <Label
    //     for = { name.nameField } > { name.nameField } </Label>  
    //    < Input type = { name.type }
    //     name = { name.nameField }
    //     id = { name.nameField }
    //     value = { new Date(item[name.nameField]).toLocaleDateString() || '' }
    //     onChange = { this.handleChange }
    //     autoComplete = { name.nameField }
    //     />   
    //    </ FormGroup >       
    //   )
    //   else{
    //     return (
    //         <FormGroup >
    //         <Label
    //         for = { name.nameField } > { name.nameField } </Label>  
    //        < Input type = { name.type }
    //         name = { name.nameField }
    //         id = { name.nameField }
    //         value = { item[name.nameField] || '' }
    //         onChange = { this.handleChange }
    //         autoComplete = { name.nameField }
    //         />   
    //        </ FormGroup >

    //     )}
    //  }  
    //  else{
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
    //   }
              
            }))
        } </div>



        console.log("promotionList", promotionList);
        return <div >    
            <AppNavbar />

              <Container > { title } 
            <Form onSubmit = { this.handleSubmit } >

            { promotionList }

        < FormGroup >
  
             < Button color = "primary"
     type = "submit" > Save </Button>{' '}   
         < Button color = "secondary"
        tag = { Link }
        to = "/promotions" > Cancel </Button>   
        </FormGroup > 
            </Form>  
         </Container >
    
            </div>
    }
}

export default withRouter(PromotionEdit);
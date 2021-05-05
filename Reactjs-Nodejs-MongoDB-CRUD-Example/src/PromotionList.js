import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import './PromotionList.css'
  
class PromotionList extends Component {
    
    constructor(props) {
        super(props);
        this.state = { fields: [], promotions: [], isLoading: true ,lastScrollTop:0, pageNo:1,scroll:"down"};
        this.remove = this.remove.bind(this);
        
    }
    
    componentDidMount() {

        this.setState({ isLoading: true });

       fetch(`api/promotions/${0}`).then(response => {
                    response.json()
                    .then(data => this.setState({ promotions: data,isLoading: false }));       
			})
			.catch(error => {
				alert('Axios GET request failed');
			})

            fetch('api/fields')
            .then(response => response.json())
            .then(data => {this.setState({ fields: data, isLoading: false ,pageNo:1})});      
    }

    async remove(id) {
        await fetch(`/api/promotion/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            console.log("Remove Done!");
            let updatedPromotions = [...this.state.promotions].filter(i => i._id !== id);
            this.setState({ promotions: updatedPromotions });
        });
    }
   
    getData(){
        
        const pageNoumber=this.state.pageNo;
 console.log("this.state.pageNo",this.state.pageNo);
        //   console.log(`getdata()api/promotions/${this.state.pageNo}`);
          fetch(`api/promotions/${this.state.pageNo}`).then(response => {
           response.json()
           .then(data => { 
            //    console.log("getdata data",data,!(JSON.stringify(data)===JSON.stringify([])));
            //    console.log("this.state.pageNo",this.state.pageNo);
              if(!(JSON.stringify(data)===JSON.stringify([]))){
                //   console.log("getdata this.state.pageNo>pageNoumber",this.state.pageNo,pageNoumber);
                    if(this.state.pageNo>pageNoumber){
                this.setState({ promotions: this.state.promotions.concat(data), isLoading: false})
                // console.log("this.state.pageNo",this.state.pageNo);
               if(pageNoumber>2)//if not first
               {
                //    console.log("getdata data.length",data.length);
                      this.state.promotions.splice(0,20)
                    //   console.log("this.state.promotions",this.state.promotions);
               }
              }
              else{ } 
          
              }
              else{
                const pg = this.state.pageNo -1;
                this.setState({pageNo:pg})
              }
             });
          })
       }
       getDataUpScroll(){

if(this.state.pageNo<0){
    this.state({pageNo:0});
}
else{
//    //    let pageNoumber=this.state.pageNo;
//                 //     pageNoumber=pageNoumber-1;
//               //  if(this.state.pageNo>=0){
//                    
//                     fetch(`api/promotions/${this.state.pageNo}`).then(response => {
//                      response.json()
      //  .then(data => { 
                       
//                         // if(this.state.pageNo>pageNoumber){
//                     // contac data to front
                
//                          this.setState({ promotions: data.concat(this.state.promotions), isLoading: false})
//                          // if(pageNoumber<1112)//if not last???change the number to?
//                          // {
//                              console.log("llll",data.length);
//                     this.state.promotions.splice(60,20)//? check if(20,20)
//                      });
//                     })






fetch(`api/promotions/${this.state.pageNo}`).then(response => {
                         response.json()
                         .then(data => { 
                           console.log("this.state.promotions",this.state.promotions);
                            // if(this.state.pageNo>pageNoumber){
                        // contac data to front
                        console.log("data",data);
                    const DataArray=data.concat(this.state.promotions);
                    console.log("DataArray",DataArray);
                             this.setState({ promotions:DataArray , isLoading: false})
                             // if(pageNoumber<1112)//if not last???change the number to?
                             // {
                                //  console.log("llll",data.length);


// if()//splice just if not the end
// {}
// else{}
                        this.state.promotions.splice(60,20)//? check if(20,20)


                         });
                        })

    const pg = this.state.pageNo + 2;
        this.setState({pageNo:pg})

}                           
               }
  

   firstEvent = (e) => {

    const st = e.target.scrollTop; 
    if (st > this.state.lastScrollTop){
       // downscroll code
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
           if(bottom){
               const pg = this.state.pageNo + 1;
               this.setState({pageNo:pg})
               this.getData();
           }

       console.log("downscroll code");
    } else {
        // upscroll code
const scrollBottom=e.target.scrollHeight-(e.target.scrollHeight-e.target.scrollTop)<50;
    console.log("scrollBottom",scrollBottom);
    if(scrollBottom){
        const pg = this.state.pageNo - 3;
        this.setState({pageNo:pg})
        // let pg = this.state.pageNo - 1;
        // this.setState({pageNo:pg})
        this.getDataUpScroll();
    }
        console.log("upscroll code");
    }
    this.setState({lastScrollTop: st <= 0 ? 0 : st })
 }

    render() {
        
        const { fields, promotions, isLoading } = this.state;
      

        if (isLoading) {
            return <p > Loading... </p>;
        }
        const fieldsList=fields.map(a=>a.fieldName.map(f=><th >{f.nameField}</th>))
        const promotionList = promotions.map(promotion => {
            return <tr key = { promotion._id } >

                {fields.map(f=>f.fieldName.map(name=> {
                   
                    if(name.type==='Date'){
                        if(promotion[name.nameField])
           return ( 
                         <td > {new Date(promotion[name.nameField]).toLocaleDateString() } </td>     
                  
          )
          else{
            return ( 
                <td > {promotion[name.nameField]} </td>     
         
 )
          }
         }  else{
            return       ( 
                <td > { promotion[name.nameField] } </td>     
         
 )
          }
                   
                }))}
             <td > 

                <ButtonGroup >
                
               < Button size = "sm"
            color = "primary"
            tag = { Link }
            to = { "/promotions/" + promotion._id } > Edit </Button>   <
            Button size = "sm"
            color = "danger"
            onClick = {
                    () => this.remove(promotions._id)
                } > Delete </Button>   
                </ButtonGroup > 
                </td>   
               </tr >
        });

        return ( 
            <div  className="div" 
            onScroll={this.firstEvent}>
            < AppNavbar />
            <Container fluid > 
            <div className = "float-right" >
                        <Button color = "success"
            tag = { Link }
            to = "/promotions/new" > Add Promotion </Button>   
           </ div > 
           
           < h3 > Promotion List </h3>  
            < Table className = "mt-4" >
           
             <thead >
             <tr >
                 {fieldsList}
           </ tr > 
            </thead>  
             <tbody > { promotionList }
             </tbody>  
            </Table > 
            </Container>   
           </ div >
        );
    }
}

export default PromotionList;
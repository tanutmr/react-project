import React, { Component } from 'react';
import ProductService from './ProductService';

class ListProductComponent extends Component {
    constructor(props)
    {
        super(props)
        this.state =({
            products:[],
            message: ' '
        })
        this.refreshProducts = this.refreshProducts.bind(this);
        

    }
    refreshProducts()
    { 
        ProductService.getAllProducts() 
        .then( response => { console.log(response)
        this.setState({products:response.data})
        } ) 
    } 
    
    componentDidMount()
    { 
        this.refreshProducts(); 
    }

    deleteProduct(productId){
        console.log("Delete Product called : "+productId)
        ProductService.deleteProduct(productId)
        .then(
            response =>{
                this.setState({ message: `Deleted product ${productId} successfully`})
                this.refreshProducts();
            }
        )
    }
    updateProduct(productId){
            //this.props.history.push(`/products/${productId}`)
            this.props.history.push(`/products/${productId}`)
    }
    addProduct(){ 
        this.props.history.push(`/products/-1`) 
    }
    
    render() {
        return (
            <div className="container">
                <h3>All Products</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Product Name</th>
                                <th>Quantity On Hand</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map(
                                    product =>
                                        <tr key={product.productId}>
                                            <td>{product.productId}</td>
                                            <td>{product.productName}</td>
                                            <td>{product.quantityOnHand}</td>
                                            <td>{product.price}</td>
                                            <td><button className="btn btn-warning"
                                            onClick={() => this.deleteProduct(product.productId)}>Delete</button></td>

                                            <td><button className="btn btn-warning"
                                            onClick={() => this.updateProduct(product.productId)}>Update</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <button className="btn btn-warning" onClick={() => this.addProduct()}>Add Product </button>
                </div>
            </div>
        );
 
    }
 
}

export default ListProductComponent;
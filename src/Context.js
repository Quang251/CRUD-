import React, { Component } from 'react';
import { rowData } from './appData';

const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        Alldata: rowData,
        id: "",
        title: "",
        info: "",
        price: "",
        company: "",
        updateEdit: []
    }
    getRecord = (id) => {
        const product = this.state.Alldata.find(item => item.id === id);
        return product;
    }
    onEdit = (id) => {
        const tempProduct = this.state.Alldata;
        const index = tempProduct.indexOf(this.getRecord(id));
        const selectedProduct = tempProduct[index];
        this.setState({
            id: selectedProduct['id'],
            title: selectedProduct['title'],
            info: selectedProduct['info'],
            price: selectedProduct['price'],
            company: selectedProduct['company'],
        })
    }
    onDelete = (id) => {
        const updatedProducts = this.state.Alldata.filter(item => item.id !== id);
        this.setState({
            Alldata: updatedProducts
        })
    }
    updateValue = (e, field) => {
        this.setState({
            [field]: e.target.value
        })
    }
    onSave = () => {
        const { id, title, info, price, company } = this.state;
        if (id) {
            // Update existing record
            const updatedProducts = this.state.Alldata.map(item =>
                item.id === id ? { id, title, info, price, company, inCart: false, count: 1 } : item
            );
            this.setState({
                Alldata: updatedProducts,
                id: "",
                title: "",
                info: "",
                price: "",
                company: ""
            });
        } else {
            // Add new record
            const newId = this.state.Alldata.length > 0 ? Math.max(...this.state.Alldata.map(p => p.id)) + 1 : 1;
            const newProduct = {
                id: newId,
                title,
                info,
                price,
                company,
                inCart: false,
                count: 1
            };
            this.setState({
                Alldata: [...this.state.Alldata, newProduct],
                id: "",
                title: "",
                info: "",
                price: "",
                company: ""
            });
        }
    }
    render() {
        //console.log(this.state.Alldata);
        return (
            <div>
                <ProductContext.Provider value={{
                    ...this.state,
                    onEdit: this.onEdit,
                    onDelete: this.onDelete,
                    updateValue: this.updateValue,
                    onSave: this.onSave
                }}>
                    {this.props.children}
                </ProductContext.Provider>
            </div>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductContext, ProductConsumer, ProductProvider };
import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxn/Auxn';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = { 
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null}); // clear any errors
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                // console.log(error);
                let errorInHebrew;
                // console.log(error);
                // console.log(error.message);
                // console.log(error.response);
                if(error.response !== undefined ){
                if(error.response.data.error === 'Auth token is expired'){
                    errorInHebrew='פג תוקף המשתמש, נא להתחבר מחדש';
                    // console.log(errorInHebrew);

                }
            }

                else if(error.message === 'Network Error'){
                    errorInHebrew='אין חיבור אינטרנט'; 

                }
                
            //    console.log(error.response.data.error);
            //    console.log(error);
            //    console.log(error.response);
            //    console.log(error.response.data);
                this.setState({error: errorInHebrew});
            });
        }

        componentWillUnmount() { //
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
           // console.log(this.state.error);
            //Request failed with status code 401
            //Network error
            //Auth token is expired - שיתחברו מחדש
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;

{/* <Aux>
<Modal 
    show={this.state.error}
    modalClosed = {this.errorConfirmedHandler}>
    {this.state.error ? this.state.error.message : null}
</Modal>
<WrappedComponent {...this.props} />
</Aux> */}
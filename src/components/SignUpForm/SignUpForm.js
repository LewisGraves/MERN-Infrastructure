import { Component } from 'react'
import { signUp } from "../../utilities/users-service"

export default class SignUpForm extends Component {
    // state is just a POJO
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
    }

    handleChange = (event) => {
        this.setState({
            // name, email, password, confirm
            [event.target.name]: event.target.value,
            error: ''
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        // alert(JSON.stringify(this.state))
        try {
            // taking the state, copying it and asigning it to formData
            const formData = {...this.state}
            delete formData.error
            delete formData.confirm

            // wait for a response back from the user
            const user = await signUp(formData)
            // just for right now
            this.props.setUser(user)
        } catch (error) {
            console.error(error)
            this.setState({
                error: 'Sign-up failed - try again later.'
            })
        }
    }

    render() {
        const disabled = this.state.password !== this.state.confirm

        return(
            <div className="form-container">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                    />
                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                        required
                    />
                    <label>Confirm</label>
                    <input
                        type='password'
                        name='confirm'
                        value={this.state.confirm}
                        onChange={this.handleChange}
                        required
                    />
                    <button type='submit' disabled={disabled}>Sign Up</button>
                </form>
                <p className="error-message">{this.state.error}</p>
            </div>
        )
    }
}
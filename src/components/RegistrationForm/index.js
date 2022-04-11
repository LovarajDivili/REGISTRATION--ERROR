import {Component} from 'react'
import './index.css'

class RegistrationFrom extends Component {
  state = {
    firstName: '',
    lastName: '',
    firstNameErrMsg: false,
    lastNameErrMsg: false,
    isFormSubmitted: false,
  }

  onClickAnotherResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      firstName: '',
      lastName: '',
    }))
  }

  onBlurLastName = () => {
    const isValid = this.isValidLastName()
    this.setState({
      lastNameErrMsg: !isValid,
    })
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onBlurFirstName = () => {
    const isValid = this.isValidFirstName()

    this.setState({
      firstNameErrMsg: !isValid,
    })
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  isValidFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  isValidLastName = () => {
    const {lastName} = this.state
    return lastName !== ''
  }

  successfulRegistration = () => (
    <div className="successful-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        className="successful-icon"
        alt="success"
      />
      <p className="description">Submitted Successfully</p>
      <div>
        <button
          type="button"
          onClick={this.onClickAnotherResponse}
          className="submit-another-button"
        >
          Submit Another Response
        </button>
      </div>
    </div>
  )

  onFormSubmit = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state
    const isFirstNameEntered = this.isValidFirstName()
    const isLastNameEntered = this.isValidLastName()

    if (isFirstNameEntered && isLastNameEntered) {
      this.setState({isFormSubmitted: true})
      this.successfulRegistration()
    } else {
      this.setState({
        firstNameErrMsg: !isFirstNameEntered,
        lastNameErrMsg: !isLastNameEntered,
        isFormSubmitted: false,
      })
    }
  }

  renderSubmitFrom = () => {
    const {lastNameErrMsg, firstNameErrMsg} = this.state
    console.log(firstNameErrMsg)
    console.log(lastNameErrMsg)
    const inputFirstNameStyling = firstNameErrMsg
      ? 'error-input-element'
      : 'input-element'
    const inputLastNameStyling = lastNameErrMsg
      ? 'error-input-element'
      : 'input-element'
    return (
      <div>
        <h1 className="main-heading">Registrations</h1>
        <form className="registration-form" onSubmit={this.onFormSubmit}>
          <label htmlFor="firstName" className="label-element">
            FIRST NAME
          </label>
          <br />
          <input
            type="text"
            id="firstName"
            className={inputFirstNameStyling}
            placeholder="First name"
            onBlur={this.onBlurFirstName}
            onChange={this.onChangeFirstName}
          />
          <br />
          {firstNameErrMsg && <p className="error-message">Required</p>}
          <label htmlFor="lastName" className="label-element">
            LAST NAME
          </label>
          <br />
          <input
            type="text"
            id="lastName"
            className={inputLastNameStyling}
            placeholder="Last name"
            onBlur={this.onBlurLastName}
            onChange={this.onChangeLastName}
          />
          {lastNameErrMsg && <p className="error-message">Required</p>}
          <div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    const {isFormSubmitted} = this.state
    return (
      <div className="registration-form-container">
        {isFormSubmitted
          ? this.successfulRegistration()
          : this.renderSubmitFrom()}
      </div>
    )
  }
}
export default RegistrationFrom

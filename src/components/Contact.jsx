/* import { useRef, useState } from "react"; */
import styled from "styled-components";
import { useForm } from "react-hook-form";
import axios from 'axios';
import PropTypes from 'prop-types';
import Faq from "./Faq";

const Section = styled.div`
  width: 100%;
  margin-top: 40px 0px;
  background-color: #1a1a1ae1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 30px;
  padding: 30px;
  @media only screen and (max-width: 768px) {
    grid-template-columns: auto;
  }
`;

const Title = styled.h1`
  font-weight: 100;
  font-family: "Cabin", sans-serif;
  color: #fff;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;
  

const Input = styled.input`
  padding: 20px;
  background-color: #e8e6e6;
  border: none;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  border-radius: 5px;
  background-color: #e8e6e6;
`;

const Button = styled.button`
  background-color: #ff6611;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  padding: 20px;
`;



function SuccessMessage() {
  return (
    alert("Your data has been successfully saved!")
  );
}

function ErrorMessage(props) {
  return (
    <div className="error-message">
      <p>{props.message}</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const Contact = ({change}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const Submit = async(event) => {
    try {
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
      }
      const response = await axios.post("http://shaktimahotsav.ch.amrita.edu/php/contact.php", event, 
      {headers: headers, 
      maxBodyLength: 100,
          maxContentLength: 100
        });
      console.log(response);
      SuccessMessage();
      var form = document.getElementById("ContactForm");
      form.reset();
    } catch (error) {
      console.error(error);
      ErrorMessage("There was an error submitting your data.");
    }
  };
  
  return (
    <Section id="contact">
      <Container>
        <Left>
          <Faq/>
        </Left>
        <Right>
          <Form onSubmit={handleSubmit(Submit)} id="ContactForm">
            <Title style={{fontFamily: "Signika Negative, sans-serif"}}>Suggestion</Title>
            <Input placeholder="Name" {...register('name', { required: true })}/>
            {errors.name && <span className="error">Name is required</span>}
            <Input placeholder="Phone Number" {...register('phone', { required: "Phone Number is required", validate:{
                  maxLength: (v) =>
    v.length <= 10 || "The Phone number should have 10 digits",
    minLength: (v) =>
    v.length >= 10 || "The Phone number should have 10 digits",
                } })}
              />
              {errors.phone?.message && (
    <small>{errors.phone.message}</small>
  )}
            <TextArea
              placeholder="Write your message"
              rows={7}
              {...register('message', { required: true })}
            />
            {errors.message && <small className="error">Message is required</small>}
            <Button type="submit">Send</Button>
        </Form>
        </Right>
        
      </Container>
    </Section>
  );
};

export default Contact;

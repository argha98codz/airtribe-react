import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
    Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
  } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from './Login.module.css';
import { setUserData } from "../store/slices/userSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
          email: '',
          password: ''
        },
    
        validate: {
          email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
          password: (val) => (val.length <= 4 ? 'Password should include at least 4 characters' : null),
        },
    });
    const submit = () => {
        const payload = {
            email: form.values.email,
            password: form.values.password
        }
        const dummyPayload = {
            email: "airtribe@gmail.com",
            password: 'test123'
        }
        if (payload.email === dummyPayload.email && payload.password === dummyPayload.password) {
            localStorage.setItem('airtribe-user-auth', 'authenticated');
            dispatch(setUserData(payload));
            navigate('/products', {
               replace: true,
            });
        } else {
            alert("Invalid Credentials");
        }
    }
    
    return (
        <form className={classes.wrapper} onSubmit={form.onSubmit(submit)}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
              Welcome to AirtribeBuy!
            </Title>
    
            <TextInput 
                label="Email address" 
                placeholder="hello@gmail.com" 
                size="md" 
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'} 
            />
            <PasswordInput 
                label="Password" 
                placeholder="Your password" 
                mt="md" 
                size="md"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 4 characters'}
            />
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button fullWidth mt="xl" size="md" type="submit" >
              Login
            </Button>
          </Paper>
        </form>
      );
}
 
export default LoginPage;
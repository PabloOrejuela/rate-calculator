import Section from './Components/Section'
import Container from './Components/Container'
import {Formik, Form} from 'formik' 
import Input from './Components/Input'
import Button from './Components/Button'
import { useState } from 'react'
import Balance from './Components/Balance'
import * as Yup from 'yup'


const CompoundInterest = (deposit, contribution, rate, years) => {
  let total = deposit
  for(let i = 0; i< years; i++){
    total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}


const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})


function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const val = CompoundInterest(Number(deposit), Number(contribution), Number(rate), Number(years))
    setBalance(formatter.format(val))
  }

  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: ''
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Es Obligatorio').typeError('Deber ser un número'),
            contribution: Yup.number().required('Es Obligatorio').typeError('Deber ser un número'),
            years: Yup.number().required('Es Obligatorio').typeError('Deber ser un número'),
            rate: Yup
            .number()
            .required('Es Obligatorio')
            .typeError('Deber ser un número')
            .min(0, 'El valor mínimo es 0')
            .max(1, 'El valor máximo es 1')
          })}
        >
          <Form>
            <Input name="deposit" label="Despósito Inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés" />
            <Button type='submit'>Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance >Balance final: {balance}</Balance> : null }
      </Section>
    </Container>
  )
}

export default App;

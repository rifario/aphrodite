import Image from 'next/image'
import { Box, Flex, Grid, GridItem, Heading, VStack } from '@chakra-ui/react'

import { Link } from '@rifario/components/atoms'
import { Form, Input, Password, SubmitForm } from '@rifario/components/forms'

type LoginFormData = {
  username: string
  password: string
}

export default function Login(): JSX.Element {
  const handleLogin = (data: LoginFormData) => {
    return new Promise<void>((resolve, reject) => {
      try {
        setTimeout(() => {
          console.log(data)
          resolve()
        }, 2000)
      } catch (error) {
        reject(error)
      }
    })
  }
  return (
    <Grid
      minH="100vh"
      mx="auto"
      px={[6, 10]}
      pt={5}
      placeItems="center"
      justifyContent="center"
      gap={20}
      templateColumns={[
        '1fr',
        '1fr',
        '1fr 1fr',
        '1fr 1fr',
        '0.6fr 0.6fr',
        '0.35fr 0.35fr'
      ]}
    >
      <GridItem as="aside">
        <Flex
          mx="auto"
          mb={[5, 7, 9]}
          as="span"
          aria-role="img"
          aria-hidden="true"
          align="center"
          justify={['center', 'center', 'start']}
        >
          <Image width={135} height={135} src="/assets/hand-wave-emoji.svg" />
        </Flex>
        <Heading
          textAlign={['center', 'center', 'left']}
          maxW="5ch"
          fontSize={['7xl', '7xl', '8xl', '8xl', '9xl']}
          lineHeight="none"
        >
          Bem vindo!
        </Heading>
      </GridItem>
      <GridItem
        border="2px"
        borderColor="primary.400"
        borderRadius="xl"
        px={[8, 10, 10, 20]}
        py={[16, 16, 20]}
        as="main"
      >
        <Form onSubmit={handleLogin}>
          <VStack as="header" mb={16}>
            <Heading fontWeight="bold" size="md" as="h2">
              Fazer login
            </Heading>
            <Heading fontWeight="regular" size="sm" as="h3">
              Ir para área do cliente
            </Heading>
          </VStack>
          <VStack mb={24} spacing={5}>
            <Input
              placeholder="fulano@gmail.com"
              label="Usuário"
              name="username"
              autoComplete="email"
            />
            <Password
              placeholder="Sua senha"
              label="Senha"
              name="password"
              autoComplete="current-password"
              formHelper={<Link href="#">Esqueceu sua senha?</Link>}
            />
          </VStack>
          <Box as="footer">
            <SubmitForm w="full" size="lg" loadingText="Fazendo login">
              Fazer login
            </SubmitForm>
          </Box>
        </Form>
      </GridItem>
    </Grid>
  )
}

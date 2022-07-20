import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {logout} from '../actions/userActions'
function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container fluid>
          <LinkContainer to='/'>
            <Navbar.Brand >Eshop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto">
              <LinkContainer to="/cart">
                <Nav.Link ><i className="fas fa-shopping-cart"></i> Carrinho</Nav.Link>
              </LinkContainer>
              {
                userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                  <Nav.Link ><i className="fas fa-user"></i> Login</Nav.Link>
                  </LinkContainer>
                )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
import React, { useEffect } from 'react'
import { Col, Container, Row, Breadcrumb, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

import { fetchPokemonDetail, addMyPokemon } from '../Redux/Actions/Action';

const PokemonDetail = () => {

	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()

	const getId = () => {
		const url = location.pathname.split('/')
		const result = url[url.length - 1]
		return result;
	}

	useEffect(() => {
    dispatch(fetchPokemonDetail(getId()))
  }, [dispatch])

	const pokemonDetail = useSelector((state) => state.getPokemon.dataPokemonDetail)
	const myPokemonList = useSelector((state) => state.getPokemon.dataMyPokemon)

	// Probabilitas 50%
	const onCatchPokemon = () => {
		if(Math.random() < 0.5) {
			dispatch(addMyPokemon(pokemonDetail))
			alert('Berhasil ditangkap!')
		} else {
			alert('Tidak Berhasil ditangkap, Coba lagi!')
		}
	}

	const onNavigate = () => {
		navigate('/?key=mypokemonlist')
	}

  return (
    <div>
			<Header/>
        <Container>
					<h3>Pokemon detail</h3>
					<Breadcrumb>
						<Breadcrumb.Item><Link to={'/'}>Pokemon List</Link></Breadcrumb.Item>
						<Breadcrumb.Item active>Detail</Breadcrumb.Item>
					</Breadcrumb>
				</Container>

				<Container>
					<Row>
						<Col xs={6} xl={1} >
							<img src={pokemonDetail?.sprites?.front_default} alt="img" className='border'/>
						</Col>
						<Col xs={6}>
							<p className='mb-0'>Nama: <strong>{pokemonDetail?.name}</strong></p>
							<p>Tipe: 
								{pokemonDetail.types !== undefined && pokemonDetail.types.map((val, idx) => {
									return (
										<li key={idx}><strong>{val.type.name}</strong></li>
									)
								})}
							</p>
						</Col>
					</Row>
				</Container>

				<Container className='mt-3'>
					<Row>
						<Col>
								<Button onClick={onCatchPokemon} variant="warning" className="me-3 mt-2">Tangkap Pokemon</Button>
								{myPokemonList?.length !== 0 && <Button onClick={onNavigate} variant="outline-secondary" className='mt-2'>Lihat MyPokemonList</Button>}
						</Col>
					</Row>
				</Container>
    </div>
  )
}

export default PokemonDetail
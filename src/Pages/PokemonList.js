import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table, Spinner, Tab, Tabs, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Components/Header';

import { getPokemonList, getPokemonListWithParams } from '../Redux/Actions/Action';
import MyPokemonList from './MyPokemonList';

const PokemonList = () => {
	const [data, setData] = useState([])

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
    dispatch(getPokemonList())
  }, [dispatch])

	const dataPokemon = useSelector((state) => state.getPokemon.data?.results)
	const isLoading = useSelector((state) => state.getPokemon.isLoading)
	const { data: alldata } = useSelector((state) => state.getPokemon)

	useEffect(() => {
    setData(dataPokemon)
  }, [dataPokemon])


	const getId = (val) => {
		if (val !== undefined) {
			const splited = val.split('/')
			const result = splited[splited.length - 2]
			return result;
		}
	}

	const onClickDetail = (val) => {
		navigate(`/${getId(val)}`)
	}

	const getParams = (location) => {
    const searchParams = new URLSearchParams(location.search);
    return {
      key: searchParams.get('key') || '',
    };
  }
	const { key } = getParams(location)

	const onPaginate = (url) => {
		dispatch(getPokemonListWithParams(url))
	}

  return (
    <div>
			<Header/>
			<Container>
				<Row >
					<Col>
					<Tabs
						id="controlled-tab-example"
						activeKey={key || 'pokemonlist'}
						onSelect={(k) => navigate(`/?key=${k}`)}
						className="mb-3"
					>
						<Tab eventKey="pokemonlist" title="Pokemon List">
							<div className='text-center py-2'>
								<Button className='me-2' variant="primary" size="sm" onClick={() => onPaginate(alldata?.previous)} disabled={alldata.previous === null}>Prev</Button>
								<Button variant="primary" size="sm" onClick={() => onPaginate(alldata?.next)} disabled={alldata.next === null}>Next</Button>
							</div>
							<Table striped bordered hover size="sm" responsive='sm'>
								<thead>
									<tr>
										<th>Id</th>
										<th>Nama</th>
										<th>url</th>
									</tr>
								</thead>
								<tbody>
						{!isLoading && data?.length !== 0 ? data?.map((val,idx) => {
							return (
								<tr key={idx} onClick={() => onClickDetail(val.url)} style={{cursor:'pointer'}}>
									<td>{getId(val.url)}</td>
									<td>{val.name}</td>
									<td>{val.url}</td>
								</tr>
							)
						})
							: 	<div className="d-flex align-items-center">
									<strong>Loading...</strong>
									<Spinner animation="border" />;
								</div>}
								</tbody>
							</Table>
						</Tab>
						<Tab eventKey="mypokemonlist" title="My Pokemon List">
							<MyPokemonList/>
						</Tab>
					</Tabs>
						
					</Col>
				</Row>
			</Container>
    </div>
  )
}

export default PokemonList
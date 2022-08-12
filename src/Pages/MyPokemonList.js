import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";

import { deleteMyPokemon } from '../Redux/Actions/Action';


const MyPokemonList = () => {

	const dispatch = useDispatch()

	const myPokemonList = useSelector((state) => state.getPokemon.dataMyPokemon)

	const onDelete = (index) => {
		dispatch(deleteMyPokemon(index))
	}

  return (
    <div>
		<Container>
			<Row>
				<Col>
					<Table striped bordered hover size="sm" responsive='sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Gambar</th>
								<th>Nama</th>
							</tr>
						</thead>
						<tbody>
					{ myPokemonList?.length !== 0 ? myPokemonList?.map((val,idx) => {
						return (
							<tr key={idx}>
								<td>{val.id}</td>
								<td><img src={val.sprites.front_default}/></td>
								<td>{val.name}</td>
								<td><Button variant="danger" onClick={() => onDelete(idx)}>Hapus</Button></td>
							</tr>
						)
					})
					: <div>
						<p>Data Kosong!</p>
					</div>}
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
      
    </div>
  )
}

export default MyPokemonList
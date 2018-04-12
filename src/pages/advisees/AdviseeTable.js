import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

const x = [
	{ key: 1, adviser: 'Reginald Recario', advisee: ['Kobe Jee De Luna', 'Aaron Louie Lagazon']},
	{ key: 2, adviser: 'Kristine Bernadette Pelaez', advisee: ['Kobe Jee De Luna', 'Aaron Louie Lagazon', 'Kim Ezekiel del Mundo']},
	{ key: 3, adviser: 'Reginald Recario', advisee: ['Kobe Jee De Luna', 'Aaron Louie Lagazon', 'Aaron Louie Lagazon', 'Aaron Louie Lagazon']},
	{ key: 4, adviser: 'Reginald Recario', advisee: ['Kobe Jee De Luna', 'Aaron Louie Lagazon']}
]

class AdviseeTable extends Component {
	render() {
		return (
			<div>
				{
					x.map((advisee) =>
						<Table celled structured>
							<Table.Row>
								<Table.Cell width={4} rowspan={advisee.advisee.length}>{advisee.adviser}</Table.Cell>
								<Table.Cell width={12}>{advisee.advisee[0]}</Table.Cell>
							</Table.Row>

							{
								advisee.advisee.map((student, index) =>
									index === 0 ? 
										null 
									:
										<Table.Row>
											<Table.Cell>{student}</Table.Cell>
										</Table.Row>
								)
							}
						</Table>
					)	
				}		
			</div>
		)	
	}
}

export default AdviseeTable;

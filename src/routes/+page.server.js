import { gql } from 'graphql-request';
import { hygraph, hygraphHP } from '$lib/Utils/hygraph';
export let data;

export async function load() {
	let query = gql`
		query Assets {
			werkvormen {
				title
				beschrijving
				korteBeschrijving
				link
				studiejaar
				contactpersonen {
					email
				}
				opleiding {
					titel
					faculteit {
						titel
					}
				}
				title
				tags {
					... on Tag {
						id
						titel
					}
				}
			}
			tags {
				id
				titel
				kleur {
					hex
				}
			}
		}
	`;
	const data = await hygraphHP.request(query);

	return data;
}

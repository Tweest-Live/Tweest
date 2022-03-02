import { useQuery, gql } from "@apollo/client";

 const GET_LIVE_DATA = gql`
 {
    getLiveData {
      symbol
      timestamp
      close
    }
  }
`

export default function GetLiveData() {
  const { loading, error, data } = useQuery(GET_LIVE_DATA, {
    pollInterval: 60000,
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>{`Error! ${error}`}</div>

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

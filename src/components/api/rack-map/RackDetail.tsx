import { useSearchParams  } from 'next/navigation';

const RackDetailPage = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    return (
        <div>
            <h1>Rack Information</h1>
            <p>Rack ID: {id}</p>
        </div>
    );
};

export default RackDetailPage;
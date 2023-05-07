export default function Error() {
    document.title = 'Argent Bank - Error';

    return (    
        <main>
            <div className='hero'>
                <section className='hero-content'>
                    <h2 className='sr-only'>Error</h2>
                    <p className='subtitle'>Sorry, we couldn't find that page.</p>
                    <p className='subtitle'>Error code: 404</p>
                </section>
            </div>
        </main>
    );
}
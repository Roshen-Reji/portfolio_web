import React from 'react';

const Certificates = ({ data }) => {
    return (
        <section className="cert-section visible" id="certs">
            <div className="section-header">
                <span className="label-pill">Qualifications</span>
                <h2 className="section-title">Verified Credentials</h2>
            </div>
            <div className="cert-grid">
                {data?.map((cert, index) => (
                    <div key={index} className="cert-card">
                        <div className="cert-img-wrapper">
                            <img 
                                src={cert.image} 
                                alt={cert.title} 
                                className="cert-img" 
                                onError={(e) => e.target.src = 'https://via.placeholder.com/800x600?text=No+Image'}
                            />
                        </div>
                        <div className="cert-body">
                            <h3 className="cert-title">{cert.title}</h3>
                            <p className="cert-issuer">{cert.issuer} • {cert.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certificates;
import React from 'react';

const Mission = ({ data }) => {
    return (
        <section className="mission-section visible">
            <div className="mission-container">
                <div className="mission-content">
                    <span className="label-pill">Our Mission</span>
                    <h2 className="mission-title">{data?.title}</h2>
                    <p className="mission-text">{data?.text}</p>
                </div>
                <div className="image-container">
                    <div className="image-wrapper">
                        {data?.image && (
                            <img src={data.image} alt="Mission" className="mission-image" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
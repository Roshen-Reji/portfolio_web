import React from 'react';

const Skills = ({ data }) => {
    return (
        <section className="skills-section visible" id="skills">
            <div className="section-header">
                <span className="label-pill">Expertise</span>
                <h2 className="section-title">Technical Arsenal</h2>
            </div>
            <div className="skills-grid">
                {data?.map((skill, index) => (
                    <div key={index} className="skill-card">
                        <div className="card-content">
                            <div className="card-icon">{skill.icon || "★"}</div>
                            <h3 className="skill-title">{skill.title}</h3>
                            <p className="skill-desc">{skill.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
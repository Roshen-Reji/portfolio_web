// src/components/portfolio/Projects.jsx
import React, { useRef } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Projects = ({ data }) => {
    // 1. Ref for the tall container that enables scrolling
    const stackAreaRef = useRef(null);
    
    // 2. Use our custom hook to get a 0.0 -> 1.0 value
    const progress = useScrollAnimation(stackAreaRef);

    // 3. Helper to determine card styles based on current scroll progress
    const getCardStyle = (index, total) => {
        // Calculate where the animation is currently (e.g., at card 2.5)
        const animationProgress = progress * (total - 1);
        
        // 'k' represents the distance of this specific card from the "active" point
        const k = animationProgress - index;
        
        let style = {
            zIndex: index + 1,
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
            filter: 'blur(0px)'
        };

        if (k >= 0) {
            // Card is "active" or "past active" (scaling down and fading out)
            const scale = 1 - (0.1 * k);
            const opacity = 1 - (0.2 * k);
            const yOffset = -50 * k; // Move up slightly
            const blur = k * 5;

            style.transform = `translate(-50%, calc(-50% + ${yOffset}px)) scale(${scale})`;
            style.opacity = Math.max(0, opacity);
            style.filter = `blur(${blur}px)`;
        } else {
            // Card is "incoming" from the bottom
            const incomingK = Math.abs(k);
            // Push it way down off-screen based on viewport height
            const yOffset = incomingK * (typeof window !== 'undefined' ? window.innerHeight * 1.5 : 1000);
            
            style.transform = `translate(-50%, calc(-50% + ${yOffset}px))`;
        }
        
        return style;
    };

    return (
        <section className="projects-section" id="projects">
            <div className="project-header">
                <span className="label-pill">Portfolio</span>
                <h2 className="section-title">Selected Works</h2>
                <p className="scroll-instruction">SCROLL TO EXPLORE</p>
            </div>

            {/* The stack-area is very tall (350vh in CSS) to allow scrolling */}
            <div className="stack-area" ref={stackAreaRef}>
                <div className="sticky-wrapper">
                    {data?.map((proj, index) => (
                        <div 
                            key={index} 
                            className="proj-card"
                            style={getCardStyle(index, data.length)}
                        >
                            <div className="proj-glass-tint"></div>
                            <div className="proj-number">0{index + 1}</div>
                            
                            <div className="proj-content">
                                <span className="proj-label">{proj.label}</span>
                                <h2 className="proj-title">{proj.title}</h2>
                                <p className="proj-desc">{proj.desc}</p>
                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="proj-btn">
                                    View Project
                                </a>
                            </div>
                            
                            {/* Decorative glow behind the card */}
                            <div 
                                className="proj-img-decoration" 
                                style={{
                                    background: `radial-gradient(circle, ${proj.color || '#1a7a85'}, transparent)`
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
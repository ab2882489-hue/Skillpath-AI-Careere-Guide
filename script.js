// SkillPath AI - Main Application Script
class SkillPathAI {
    constructor() {
        this.currentPage = 'home';
        this.userProfile = null;
        this.selectedField = null;
        this.roadmapProgress = 0;
        this.chatHistory = [];
        this.projects = [];
        
        this.fieldData = {
            technology: {
                name: 'Technology',
                icon: 'fa-code',
                description: 'Software development, data science, cybersecurity, AI/ML',
                careers: ['Software Engineer', 'Data Scientist', 'UX Designer', 'DevOps Engineer', 'Cybersecurity Analyst'],
                skills: ['Programming', 'Algorithms', 'System Design', 'Database Management'],
                hackathonTypes: ['Web Development', 'Mobile Apps', 'AI/ML', 'Blockchain'],
                color: '#4361ee'
            },
            medical: {
                name: 'Medical & Health Sciences',
                icon: 'fa-heartbeat',
                description: 'Medicine, nursing, pharmacy, biotechnology, healthcare',
                careers: ['Doctor', 'Medical Researcher', 'Biotech Engineer', 'Healthcare Consultant'],
                skills: ['Medical Knowledge', 'Research Methods', 'Patient Care', 'Data Analysis'],
                hackathonTypes: ['Medical Devices', 'Healthcare Apps', 'Biotech Solutions'],
                color: '#f72585'
            },
            engineering: {
                name: 'Engineering',
                icon: 'fa-cogs',
                description: 'All engineering disciplines - mechanical, electrical, civil, chemical',
                careers: ['Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Project Manager'],
                skills: ['Technical Design', 'CAD Software', 'Project Management', 'Problem Solving'],
                hackathonTypes: ['Hardware Hacking', 'IoT Solutions', 'Sustainable Engineering'],
                color: '#4cc9f0'
            },
            architecture: {
                name: 'Architecture & Design',
                icon: 'fa-drafting-compass',
                description: 'Architectural design, urban planning, interior design',
                careers: ['Architect', 'Urban Planner', 'Interior Designer', '3D Visualizer'],
                skills: ['Design Thinking', 'CAD/3D Modeling', 'Sustainable Design', 'Project Planning'],
                hackathonTypes: ['Urban Design', 'Sustainable Architecture', 'Smart Cities'],
                color: '#7209b7'
            },
            business: {
                name: 'Business & Management',
                icon: 'fa-chart-line',
                description: 'Management, finance, marketing, entrepreneurship',
                careers: ['Business Analyst', 'Marketing Manager', 'Financial Analyst', 'Entrepreneur'],
                skills: ['Market Analysis', 'Financial Planning', 'Leadership', 'Strategy'],
                hackathonTypes: ['Business Plan', 'Marketing Campaign', 'Fintech Solutions'],
                color: '#38b000'
            },
            arts: {
                name: 'Arts & Creative Fields',
                icon: 'fa-palette',
                description: 'Fine arts, graphic design, multimedia, performing arts',
                careers: ['Graphic Designer', 'Animator', 'Art Director', 'Content Creator'],
                skills: ['Creativity', 'Visual Communication', 'Digital Tools', 'Storytelling'],
                hackathonTypes: ['Design Sprint', 'Creative Coding', 'Digital Art'],
                color: '#ff9e00'
            },
            science: {
                name: 'Science & Research',
                icon: 'fa-flask',
                description: 'Physics, chemistry, biology, environmental science',
                careers: ['Research Scientist', 'Lab Technician', 'Environmental Analyst', 'Science Writer'],
                skills: ['Scientific Method', 'Data Analysis', 'Laboratory Skills', 'Technical Writing'],
                hackathonTypes: ['Science Fair', 'Research Hack', 'Environmental Solutions'],
                color: '#06d6a0'
            }
        };

        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.renderFieldSelection();
        this.updateDashboard();
        this.showPage('home');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.showPage(page);
            });
        });

        // Theme Toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Chat Panel
        document.getElementById('chatToggle').addEventListener('click', () => {
            this.toggleChatPanel();
        });

        document.getElementById('closeChat').addEventListener('click', () => {
            this.toggleChatPanel();
        });

        document.getElementById('sendMessage').addEventListener('click', () => {
            this.sendChatMessage();
        });

        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });

        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.getAttribute('data-question');
                this.askAI(question);
            });
        });

        // Quick Actions
        document.getElementById('getStartedBtn').addEventListener('click', () => {
            this.showPage('field');
        });

        document.getElementById('learnHackathonBtn').addEventListener('click', () => {
            this.showPage('hackathon');
        });

        document.getElementById('goToProfileBtn').addEventListener('click', () => {
            this.showPage('profile');
        });

        // Field Selection
        document.getElementById('confirmFieldBtn').addEventListener('click', () => {
            if (this.selectedField) {
                this.saveFieldSelection();
                this.showPage('profile');
            }
        });

        document.getElementById('skipFieldBtn').addEventListener('click', () => {
            this.showPage('profile');
        });

        // Profile Form
        document.getElementById('studentProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfile();
        });

        document.getElementById('clearFormBtn').addEventListener('click', () => {
            this.clearProfileForm();
        });

        // Star Ratings
        document.querySelectorAll('.rating-stars i').forEach(star => {
            star.addEventListener('click', (e) => {
                const container = e.target.parentElement;
                const value = parseInt(e.target.getAttribute('data-value'));
                this.setRating(container, value);
            });
        });

        // Dashboard Actions
        document.getElementById('generateRoadmapBtn').addEventListener('click', () => {
            this.showPage('roadmap');
            this.generateRoadmap();
        });

        document.getElementById('getProjectIdeasBtn').addEventListener('click', () => {
            this.showPage('project');
            this.generateProjectIdeas();
        });

        document.getElementById('findHackathonsBtn').addEventListener('click', () => {
            this.showPage('hackathon');
        });

        document.getElementById('viewFullRoadmapBtn').addEventListener('click', () => {
            this.showPage('roadmap');
        });

        document.getElementById('refreshRecommendations').addEventListener('click', () => {
            this.generateAIRecommendations();
        });

        // Roadmap Controls
        document.getElementById('generateNewRoadmapBtn').addEventListener('click', () => {
            this.generateRoadmap();
        });

        document.getElementById('printRoadmapBtn').addEventListener('click', () => {
            this.printRoadmap();
        });

        document.getElementById('saveRoadmapBtn').addEventListener('click', () => {
            this.saveRoadmap();
        });

        // Project Controls
        document.getElementById('generateProjectIdeasBtn').addEventListener('click', () => {
            this.generateProjectIdeas();
        });

        document.getElementById('generateCustomProjectBtn').addEventListener('click', () => {
            this.generateCustomProject();
        });

        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterProjects(category);
            });
        });

        // Modal
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        document.getElementById('continueJourneyBtn').addEventListener('click', () => {
            this.closeModal();
            this.showPage('dashboard');
        });

        // Reset Data
        document.getElementById('resetDataBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all your data?')) {
                this.resetUserData();
            }
        });

        // Mobile Menu
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }

    showPage(pageName) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });

        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        document.getElementById(pageName).classList.add('active');
        this.currentPage = pageName;

        // Update window hash
        window.location.hash = pageName;

        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');

        // Update dashboard if needed
        if (pageName === 'dashboard') {
            this.updateDashboard();
        }
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    toggleChatPanel() {
        document.getElementById('chatPanel').classList.toggle('active');
    }

    renderFieldSelection() {
        const container = document.querySelector('.fields-grid-selection');
        container.innerHTML = '';
        
        Object.entries(this.fieldData).forEach(([key, field]) => {
            const card = document.createElement('div');
            card.className = 'field-card';
            card.setAttribute('data-field', key);
            card.innerHTML = `
                <i class="fas ${field.icon}"></i>
                <h3>${field.name}</h3>
                <p>${field.description}</p>
            `;
            
            card.addEventListener('click', () => {
                this.selectField(key);
            });
            
            container.appendChild(card);
        });
    }

    selectField(fieldKey) {
        // Remove previous selection
        document.querySelectorAll('.field-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selection to clicked card
        document.querySelector(`[data-field="${fieldKey}"]`).classList.add('selected');
        this.selectedField = fieldKey;
        
        // Enable confirm button
        document.getElementById('confirmFieldBtn').disabled = false;
        
        // Update field info panel
        this.updateFieldInfo(fieldKey);
    }

    updateFieldInfo(fieldKey) {
        const field = this.fieldData[fieldKey];
        const panel = document.getElementById('fieldInfoPanel');
        
        document.getElementById('selectedFieldName').textContent = field.name;
        document.getElementById('selectedFieldDescription').textContent = field.description;
        
        const detailsHTML = `
            <div class="field-detail">
                <h4><i class="fas fa-briefcase"></i> Career Paths</h4>
                <div class="tags">
                    ${field.careers.map(career => `<span class="tag">${career}</span>`).join('')}
                </div>
            </div>
            <div class="field-detail">
                <h4><i class="fas fa-tools"></i> Key Skills</h4>
                <div class="tags">
                    ${field.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="field-detail">
                <h4><i class="fas fa-trophy"></i> Hackathon Types</h4>
                <div class="tags">
                    ${field.hackathonTypes.map(type => `<span class="tag">${type}</span>`).join('')}
                </div>
            </div>
        `;
        
        document.getElementById('fieldDetails').innerHTML = detailsHTML;
        panel.style.borderLeft = `4px solid ${field.color}`;
    }

    saveFieldSelection() {
        if (this.selectedField) {
            if (!this.userProfile) {
                this.userProfile = {};
            }
            this.userProfile.selectedField = this.selectedField;
            this.saveUserData();
            this.showNotification('Field selection saved!', 'success');
        }
    }

    saveProfile() {
        const form = document.getElementById('studentProfileForm');
        const formData = new FormData(form);
        
        this.userProfile = {
            educationLevel: document.getElementById('educationLevel').value,
            fieldOfStudy: document.getElementById('fieldOfStudy').value,
            interests: Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                .map(checkbox => checkbox.value),
            primaryGoal: document.getElementById('primaryGoal').value,
            timeCommitment: document.getElementById('timeCommitment').value,
            skills: this.getSkillRatings(),
            selectedField: this.selectedField || document.getElementById('fieldOfStudy').value
        };
        
        this.saveUserData();
        this.generateAIRecommendations();
        this.showPage('dashboard');
        this.showNotification('Profile saved successfully!', 'success');
    }

    getSkillRatings() {
        const skills = {};
        document.querySelectorAll('.skill-rating').forEach(rating => {
            const skill = rating.getAttribute('data-skill');
            const activeStars = rating.querySelectorAll('.active').length;
            skills[skill] = activeStars;
        });
        return skills;
    }

    setRating(container, value) {
        const stars = container.querySelectorAll('i');
        stars.forEach((star, index) => {
            if (index < value) {
                star.className = 'fas fa-star active';
            } else {
                star.className = 'far fa-star';
            }
        });
    }

    clearProfileForm() {
        document.getElementById('studentProfileForm').reset();
        document.querySelectorAll('.rating-stars i').forEach(star => {
            star.className = 'far fa-star';
        });
    }

    updateDashboard() {
        if (!this.userProfile) return;
        
        // Update profile info
        document.getElementById('dashboardName').textContent = 'Student';
        document.getElementById('dashboardField').textContent = 
            `Field: ${this.fieldData[this.userProfile.selectedField]?.name || 'Not selected'}`;
        document.getElementById('dashboardLevel').textContent = 
            `Education: ${this.getEducationLevelText(this.userProfile.educationLevel)}`;
        document.getElementById('dashboardGoal').textContent = 
            `Goal: ${this.getGoalText(this.userProfile.primaryGoal)}`;
        document.getElementById('dashboardTime').textContent = 
            `Time: ${this.getTimeText(this.userProfile.timeCommitment)}`;
        
        // Update stats
        this.updateProgressStats();
        
        // Generate recommendations if not already done
        if (!this.userProfile.aiRecommendations) {
            this.generateAIRecommendations();
        }
    }

    updateProgressStats() {
        // Calculate progress percentage
        let progress = 0;
        if (this.userProfile) {
            if (this.userProfile.selectedField) progress += 25;
            if (this.userProfile.educationLevel) progress += 25;
            if (this.userProfile.primaryGoal) progress += 25;
            if (this.userProfile.interests?.length > 0) progress += 25;
        }
        
        this.roadmapProgress = progress;
        document.getElementById('progressPercentage').textContent = `${progress}%`;
        document.getElementById('progressFill').style.width = `${progress}%`;
        
        // Update skills count
        const field = this.fieldData[this.userProfile?.selectedField];
        const skillsCount = field ? field.skills.length : 0;
        document.getElementById('skillsCount').textContent = skillsCount;
        
        // Update project ideas count
        document.getElementById('projectIdeas').textContent = this.projects.length;
        
        // Update progress tracker
        document.getElementById('currentLevel').textContent = 
            progress < 25 ? 'Beginner' : 
            progress < 50 ? 'Intermediate' : 
            progress < 75 ? 'Advanced' : 'Expert';
        
        // Update motivation message
        this.updateMotivationMessage();
    }

    updateMotivationMessage() {
        const messages = [
            "Start your journey today! Every expert was once a beginner.",
            "Consistency is key. Small steps lead to big achievements.",
            "You're making progress! Keep up the great work.",
            "Learning is a journey. Enjoy every step of the process.",
            "Your future self will thank you for starting today.",
            "Challenges are opportunities in disguise. Keep going!",
            "You're closer than you think to your goals.",
            "Every skill you learn opens new doors of opportunity."
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById('motivationMessage').textContent = randomMessage;
    }

    generateAIRecommendations() {
        if (!this.userProfile) return;
        
        const recommendations = this.createAIRecommendations();
        this.userProfile.aiRecommendations = recommendations;
        this.saveUserData();
        
        this.displayRecommendations(recommendations);
    }

    createAIRecommendations() {
        const field = this.userProfile.selectedField;
        const goal = this.userProfile.primaryGoal;
        const time = this.userProfile.timeCommitment;
        
        let recommendations = [];
        
        // Career recommendations based on field
        if (field && this.fieldData[field]) {
            const fieldInfo = this.fieldData[field];
            recommendations.push({
                type: 'career',
                title: 'Top Career Paths',
                content: `Based on your interest in ${fieldInfo.name}, consider these careers:`,
                items: fieldInfo.careers.slice(0, 3)
            });
        }
        
        // Skill recommendations
        recommendations.push({
            type: 'skills',
            title: 'Essential Skills to Learn',
            content: 'Focus on developing these key skills for your field:',
            items: ['Problem Solving', 'Communication', this.fieldData[field]?.skills[0] || 'Technical Skills', 'Project Management']
        });
        
        // Hackathon recommendations
        if (goal === 'hackathon' || goal === 'portfolio') {
            recommendations.push({
                type: 'hackathon',
                title: 'Hackathon Preparation',
                content: 'Get ready for hackathons with these steps:',
                items: ['Join online hackathon communities', 'Build a small practice project', 'Learn teamwork and collaboration', 'Study past winning projects']
            });
        }
        
        // Time-based recommendations
        if (time === 'low') {
            recommendations.push({
                type: 'schedule',
                title: 'Optimized Learning Schedule',
                content: 'For your busy schedule, try this approach:',
                items: ['15 minutes daily skill practice', 'Weekend project sessions', 'Online micro-courses', 'Learn during commute']
            });
        }
        
        return recommendations;
    }

    displayRecommendations(recommendations) {
        const container = document.getElementById('aiRecommendations');
        let html = '';
        
        recommendations.forEach(rec => {
            html += `
                <div class="recommendation-card">
                    <h4><i class="fas ${this.getRecommendationIcon(rec.type)}"></i> ${rec.title}</h4>
                    <p>${rec.content}</p>
                    <ul>
                        ${rec.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Also update current roadmap preview
        this.updateRoadmapPreview();
    }

    getRecommendationIcon(type) {
        const icons = {
            'career': 'fa-briefcase',
            'skills': 'fa-tools',
            'hackathon': 'fa-trophy',
            'schedule': 'fa-calendar'
        };
        return icons[type] || 'fa-lightbulb';
    }

    updateRoadmapPreview() {
        const container = document.getElementById('currentRoadmap');
        if (this.userProfile?.aiRecommendations) {
            const firstRec = this.userProfile.aiRecommendations[0];
            container.innerHTML = `
                <div class="roadmap-preview">
                    <h4>${firstRec.title}</h4>
                    <ul>
                        ${firstRec.items.slice(0, 3).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <p class="preview-note">+ ${this.userProfile.aiRecommendations.length - 1} more recommendations</p>
                </div>
            `;
        }
    }

    generateRoadmap() {
        if (!this.userProfile) {
            this.showNotification('Please complete your profile first', 'warning');
            return;
        }
        
        const duration = document.getElementById('roadmapDuration').value;
        const difficulty = document.getElementById('roadmapDifficulty').value;
        
        const roadmap = this.createRoadmap(duration, difficulty);
        this.displayRoadmap(roadmap);
    }

    createRoadmap(duration, difficulty) {
        const field = this.userProfile.selectedField;
        const fieldInfo = this.fieldData[field] || this.fieldData.technology;
        
        const roadmap = {
            beginner: this.getBeginnerPhase(fieldInfo, difficulty),
            intermediate: this.getIntermediatePhase(fieldInfo, difficulty),
            advanced: this.getAdvancedPhase(fieldInfo, difficulty),
            projects: this.getProjectsPhase(fieldInfo, difficulty)
        };
        
        return roadmap;
    }

    getBeginnerPhase(fieldInfo, difficulty) {
        const phases = {
            technology: [
                'Learn programming fundamentals (Python/JavaScript)',
                'Understand basic algorithms and data structures',
                'Build simple console applications',
                'Learn version control with Git'
            ],
            medical: [
                'Study basic anatomy and physiology',
                'Learn medical terminology',
                'Understand healthcare systems',
                'Practice basic patient communication'
            ],
            business: [
                'Learn business fundamentals',
                'Understand marketing principles',
                'Study basic accounting',
                'Practice presentation skills'
            ]
        };
        
        return phases[fieldInfo.name.toLowerCase()] || [
            'Learn foundational concepts',
            'Study basic terminology',
            'Understand industry overview',
            'Practice essential skills'
        ];
    }

    getIntermediatePhase(fieldInfo, difficulty) {
        return [
            'Build portfolio projects',
            'Join relevant communities',
            'Attend workshops/webinars',
            'Network with professionals'
        ];
    }

    getAdvancedPhase(fieldInfo, difficulty) {
        return [
            'Specialize in specific area',
            'Contribute to open source/industry projects',
            'Mentor beginners',
            'Build advanced portfolio'
        ];
    }

    getProjectsPhase(fieldInfo, difficulty) {
        return [
            'Participate in hackathons',
            'Build comprehensive final project',
            'Create portfolio website',
            'Prepare for internships/jobs'
        ];
    }

    displayRoadmap(roadmap) {
        // Beginner phase
        const beginnerContent = document.getElementById('beginnerContent');
        beginnerContent.innerHTML = roadmap.beginner.map(item => `
            <div class="roadmap-item">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>${item}</strong>
                    <p>Focus on understanding core concepts</p>
                </div>
            </div>
        `).join('');
        
        // Intermediate phase
        const intermediateContent = document.getElementById('intermediateContent');
        intermediateContent.innerHTML = roadmap.intermediate.map(item => `
            <div class="roadmap-item">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>${item}</strong>
                    <p>Apply knowledge to real projects</p>
                </div>
            </div>
        `).join('');
        
        // Advanced phase
        const advancedContent = document.getElementById('advancedContent');
        advancedContent.innerHTML = roadmap.advanced.map(item => `
            <div class="roadmap-item">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>${item}</strong>
                    <p>Achieve mastery and specialization</p>
                </div>
            </div>
        `).join('');
        
        // Projects phase
        const projectsContent = document.getElementById('projectsContent');
        projectsContent.innerHTML = roadmap.projects.map(item => `
            <div class="roadmap-item">
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>${item}</strong>
                    <p>Showcase your skills to the world</p>
                </div>
            </div>
        `).join('');
        
        // Update progress
        this.roadmapProgress = 25;
        this.updateProgressStats();
    }

    generateProjectIdeas() {
        if (!this.userProfile) {
            this.showNotification('Please complete your profile first', 'warning');
            return;
        }
        
        const field = this.userProfile.selectedField;
        const fieldInfo = this.fieldData[field] || this.fieldData.technology;
        
        const ideas = this.createProjectIdeas(fieldInfo);
        this.projects = ideas;
        this.displayProjects(ideas);
    }

    createProjectIdeas(fieldInfo) {
        const baseIdeas = {
            technology: [
                {
                    title: 'Personal Portfolio Website',
                    description: 'Build a responsive website showcasing your projects and skills',
                    difficulty: 'beginner',
                    field: 'technology',
                    category: 'portfolio',
                    time: '2 weeks',
                    tags: ['Web Development', 'Frontend', 'Portfolio']
                },
                {
                    title: 'AI Chat Assistant',
                    description: 'Create a chatbot that helps with career guidance',
                    difficulty: 'intermediate',
                    field: 'technology',
                    category: 'hackathon',
                    time: '1 month',
                    tags: ['AI/ML', 'Chatbot', 'NLP']
                }
            ],
            medical: [
                {
                    title: 'Health Symptom Checker',
                    description: 'App that helps users understand their symptoms',
                    difficulty: 'intermediate',
                    field: 'medical',
                    category: 'hackathon',
                    time: '3 weeks',
                    tags: ['Healthcare', 'Mobile App', 'Diagnosis']
                },
                {
                    title: 'Medication Reminder System',
                    description: 'Tool to help patients remember their medications',
                    difficulty: 'beginner',
                    field: 'medical',
                    category: 'portfolio',
                    time: '2 weeks',
                    tags: ['Healthcare', 'Productivity', 'Mobile']
                }
            ],
            business: [
                {
                    title: 'Startup Business Plan Generator',
                    description: 'Tool that helps create comprehensive business plans',
                    difficulty: 'intermediate',
                    field: 'business',
                    category: 'startup',
                    time: '1 month',
                    tags: ['Business', 'Planning', 'Finance']
                }
            ]
        };
        
        return baseIdeas[fieldInfo.name.toLowerCase()] || [
            {
                title: 'Field-Specific Research Project',
                description: 'Conduct research on current trends in your field',
                difficulty: 'intermediate',
                field: fieldInfo.name.toLowerCase(),
                category: 'research',
                time: '2 months',
                tags: ['Research', 'Analysis', fieldInfo.name]
            }
        ];
    }

    displayProjects(projects) {
        const container = document.getElementById('projectGrid');
        
        if (projects.length === 0) {
            container.innerHTML = `
                <div class="empty-projects">
                    <i class="fas fa-lightbulb fa-3x"></i>
                    <h3>No Project Ideas Yet</h3>
                    <p>Click "Generate Ideas" to get AI-powered project suggestions for your field</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        projects.forEach(project => {
            html += `
                <div class="project-card" data-field="${project.field}" data-difficulty="${project.difficulty}" data-category="${project.category}">
                    <div class="project-header">
                        <h3>${project.title}</h3>
                        <div class="project-tags">
                            <span class="tag">${project.difficulty}</span>
                            <span class="tag">${project.field}</span>
                            <span class="tag">${project.time}</span>
                        </div>
                    </div>
                    <div class="project-content">
                        <p>${project.description}</p>
                        <div class="project-meta">
                            <span><i class="fas fa-clock"></i> ${project.time}</span>
                            <span><i class="fas fa-tag"></i> ${project.category}</span>
                        </div>
                        <div class="tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="project-actions">
                            <button class="btn-secondary btn-small">Save</button>
                            <button class="btn-primary btn-small">View Details</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Update suggested projects in dashboard
        this.updateSuggestedProjects(projects.slice(0, 2));
    }

    updateSuggestedProjects(projects) {
        const container = document.getElementById('suggestedProjects');
        if (projects.length === 0) return;
        
        let html = '';
        projects.forEach(project => {
            html += `
                <div class="project-suggestion">
                    <h4>${project.title}</h4>
                    <p>${project.description.substring(0, 60)}...</p>
                    <span class="tag">${project.difficulty}</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    generateCustomProject() {
        const topic = document.getElementById('projectTopic').value;
        const field = document.getElementById('customProjectField').value;
        const difficulty = document.getElementById('customProjectDifficulty').value;
        const time = document.getElementById('customProjectTime').value;
        
        if (!topic.trim()) {
            this.showNotification('Please enter a project topic', 'warning');
            return;
        }
        
        const project = this.createCustomProject(topic, field, difficulty, time);
        this.projects.unshift(project);
        this.displayProjects(this.projects);
        
        this.showNotification('Custom project idea generated!', 'success');
        document.getElementById('projectTopic').value = '';
    }

    createCustomProject(topic, field, difficulty, time) {
        const fieldInfo = this.fieldData[field] || this.fieldData.technology;
        
        return {
            title: `${topic} - ${fieldInfo.name} Solution`,
            description: `A ${difficulty} level project addressing ${topic} using ${fieldInfo.name} principles and techniques.`,
            difficulty: difficulty,
            field: field,
            category: 'custom',
            time: time,
            tags: [fieldInfo.name, difficulty, topic.split(' ')[0]]
        };
    }

    filterProjects(category) {
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    sendChatMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addChatMessage(message, 'user');
        input.value = '';
        
        // Generate AI response
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.addChatMessage(response, 'ai');
        }, 1000);
    }

    addChatMessage(message, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const senderName = sender === 'user' ? 'You' : 'SkillPath AI';
        messageDiv.innerHTML = `
            <div class="message-content">
                <strong>${senderName}:</strong> ${message}
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Save to history
        this.chatHistory.push({ sender, message, timestamp: new Date() });
    }

    askAI(question) {
        this.addChatMessage(question, 'user');
        
        setTimeout(() => {
            const response = this.generateAIResponse(question);
            this.addChatMessage(response, 'ai');
        }, 1000);
    }

    generateAIResponse(question) {
        const responses = {
            'what is a hackathon?': 'A hackathon is an event where people from various backgrounds collaborate intensively to create innovative solutions to real-world problems. It\'s not just for programmers - designers, business students, medical professionals, and artists can all participate and contribute unique skills!',
            'which career suits me?': 'Based on your profile, I recommend exploring careers that match your interests and skills. Complete your profile in the "Build Profile" section to get personalized career recommendations specific to your field and goals.',
            'what skills should i learn?': 'The skills you should learn depend on your chosen field. For technology: programming, problem-solving, and system design. For business: communication, analysis, and leadership. For medical: research, patient care, and data analysis. Complete your profile for personalized skill recommendations!',
            'how do i start with hackathons?': 'Start by: 1) Joining online hackathon communities, 2) Building a small practice project, 3) Learning basic teamwork skills, 4) Finding a hackathon that matches your interests. Check our "What are Hackathons?" page for detailed guidance!',
            'what projects should i build?': 'Build projects that: 1) Solve real problems in your field, 2) Showcase your skills, 3) Can be completed in your available time. Visit the "Project Ideas" page for AI-generated project suggestions tailored to your profile!'
        };
        
        const lowerQuestion = question.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerQuestion.includes(key)) {
                return response;
            }
        }
        
        const genericResponses = [
            "That's a great question! I recommend checking our specialized sections for detailed guidance on that topic.",
            "I'd be happy to help with that. Could you provide more details about what you're looking for?",
            "Based on common student needs, I suggest focusing on building practical skills and working on real projects in your field.",
            "Many students find success by starting with small projects and gradually taking on more complex challenges.",
            "Consider what problems interest you in your field, and explore how technology can help solve them."
        ];
        
        return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }

    saveRoadmap() {
        if (this.userProfile) {
            this.userProfile.savedRoadmap = true;
            this.saveUserData();
            this.showNotification('Roadmap saved to your dashboard!', 'success');
        }
    }

    printRoadmap() {
        window.print();
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#4caf50' : '#ff9800'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1003;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showProgressModal() {
        const modal = document.getElementById('progressModal');
        const progress = this.roadmapProgress;
        
        document.getElementById('progressMessage').textContent = 
            `You're ${progress}% through your learning journey!`;
        
        // Update progress circle
        const circumference = 2 * Math.PI * 40;
        const offset = circumference - (progress / 100) * circumference;
        document.querySelector('.progress-fg').style.strokeDashoffset = offset;
        document.querySelector('.progress-text').textContent = `${progress}%`;
        
        // Update milestones
        const milestones = this.getMilestones(progress);
        const milestoneList = document.querySelector('.milestone-list');
        milestoneList.innerHTML = milestones.map(milestone => `
            <div class="milestone ${milestone.completed ? 'completed' : ''}">
                <i class="fas fa-${milestone.completed ? 'check' : 'circle'}"></i>
                <span>${milestone.text}</span>
            </div>
        `).join('');
        
        modal.classList.add('active');
    }

    getMilestones(progress) {
        return [
            { text: 'Profile Completed', completed: progress >= 25 },
            { text: 'First Project Started', completed: progress >= 50 },
            { text: 'Skills Learned', completed: progress >= 75 },
            { text: 'Portfolio Ready', completed: progress >= 100 }
        ];
    }

    closeModal() {
        document.getElementById('progressModal').classList.remove('active');
    }

    saveUserData() {
        const data = {
            userProfile: this.userProfile,
            selectedField: this.selectedField,
            roadmapProgress: this.roadmapProgress,
            chatHistory: this.chatHistory,
            projects: this.projects,
            theme: document.body.getAttribute('data-theme') || 'light'
        };
        localStorage.setItem('skillPathAI', JSON.stringify(data));
    }

    loadUserData() {
        const savedData = localStorage.getItem('skillPathAI');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.userProfile = data.userProfile || null;
            this.selectedField = data.selectedField || null;
            this.roadmapProgress = data.roadmapProgress || 0;
            this.chatHistory = data.chatHistory || [];
            this.projects = data.projects || [];
            
            // Apply saved theme
            if (data.theme) {
                document.body.setAttribute('data-theme', data.theme);
                const icon = document.querySelector('#themeToggle i');
                icon.className = data.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    resetUserData() {
        localStorage.removeItem('skillPathAI');
        this.userProfile = null;
        this.selectedField = null;
        this.roadmapProgress = 0;
        this.chatHistory = [];
        this.projects = [];
        
        // Reset form
        this.clearProfileForm();
        
        // Update UI
        this.updateDashboard();
        this.showPage('home');
        
        this.showNotification('All data has been reset', 'success');
    }

    // Helper methods
    getEducationLevelText(level) {
        const levels = {
            'school': 'High School',
            'undergrad': 'Undergraduate',
            'postgrad': 'Postgraduate',
            'freshgrad': 'Fresh Graduate',
            'working': 'Working Professional'
        };
        return levels[level] || 'Not specified';
    }

    getGoalText(goal) {
        const goals = {
            'career': 'Find Career Path',
            'skills': 'Learn New Skills',
            'hackathon': 'Participate in Hackathons',
            'portfolio': 'Build Portfolio',
            'startup': 'Start a Startup',
            'networking': 'Network with Professionals'
        };
        return goals[goal] || 'Not specified';
    }

    getTimeText(time) {
        const times = {
            'low': '1-5 hours/week',
            'medium': '5-10 hours/week',
            'high': '10-20 hours/week',
            'full': '20+ hours/week'
        };
        return times[time] || 'Not specified';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize app
    window.skillPathAI = new SkillPathAI();
});

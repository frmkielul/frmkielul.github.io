document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const startButton = document.getElementById('startButton');
    const sections = {
        healing: document.getElementById('healing'),
        attraction: document.getElementById('attraction'),
        connection: document.getElementById('connection'),
        actionPlan: document.getElementById('actionPlan'),
        movingForward: document.getElementById('movingForward'),
    };

    // Healing Section Elements
    const journalLearned = document.getElementById('journalLearned');
    const journalFeeling = document.getElementById('journalFeeling');
    const journalStep = document.getElementById('journalStep');
    const saveJournalButton = document.getElementById('saveJournalButton');
    const journalSaveStatus = document.getElementById('journalSaveStatus');
    const letGoInput = document.getElementById('letGoInput');
    const releaseButton = document.getElementById('releaseButton');
    const releaseAnimationArea = document.getElementById('releaseAnimationArea');

    // Attraction Section Elements (Values Form for simplicity - no saving needed here, focus is reflection)
    // const valuesForm = document.getElementById('valuesForm'); // If needed later

    // Connection Section Elements
    const partnerNonNegotiable = document.getElementById('partnerNonNegotiable');
    const partnerGoodDay = document.getElementById('partnerGoodDay');
    const savePartnerQualitiesButton = document.getElementById('savePartnerQualitiesButton');
    const partnerSaveStatus = document.getElementById('partnerSaveStatus');
    const generateStarterButton = document.getElementById('generateStarterButton');
    const conversationStarterOutput = document.getElementById('conversationStarterOutput');

    // Action Plan Elements
    const weeklyGoalsForm = document.getElementById('weeklyGoalsForm');
    const goalCheckboxes = weeklyGoalsForm.querySelectorAll('input[type="checkbox"]');
    const goalsSaveStatus = document.getElementById('goalsSaveStatus');

    // --- Initial Load Function ---
    function loadSavedData() {
        // Load Journal Entries
        journalLearned.value = localStorage.getItem('journalLearned') || '';
        journalFeeling.value = localStorage.getItem('journalFeeling') || '';
        journalStep.value = localStorage.getItem('journalStep') || '';

        // Load Partner Qualities
        partnerNonNegotiable.value = localStorage.getItem('partnerNonNegotiable') || '';
        partnerGoodDay.value = localStorage.getItem('partnerGoodDay') || '';

        // Load Weekly Goals Checkbox States
        goalCheckboxes.forEach(checkbox => {
            const savedState = localStorage.getItem(`goal_${checkbox.value}`);
            if (savedState === 'true') {
                checkbox.checked = true;
            }
        });
    }

    // --- Event Listeners ---

    // Start Button
    startButton.addEventListener('click', () => {
        Object.values(sections).forEach(section => {
            section.classList.remove('hidden');
        });
        startButton.style.display = 'none'; // Hide start button after click
        sections.healing.scrollIntoView({ behavior: 'smooth' });
        loadSavedData(); // Load data once sections are visible
    });

    // Save Journal Entries Button
    saveJournalButton.addEventListener('click', () => {
        localStorage.setItem('journalLearned', journalLearned.value);
        localStorage.setItem('journalFeeling', journalFeeling.value);
        localStorage.setItem('journalStep', journalStep.value);
        journalSaveStatus.textContent = 'Journal entries saved locally!';
        setTimeout(() => { journalSaveStatus.textContent = ''; }, 3000); // Clear message after 3s
    });

    // Release Button (Letting Go Visualization)
    releaseButton.addEventListener('click', () => {
        const textToRelease = letGoInput.value.trim();
        if (textToRelease) {
            const p = document.createElement('p');
            p.textContent = textToRelease;
            p.classList.add('released-text');
            // Random horizontal start position
            p.style.left = `${Math.random() * 60 + 20}%`; // Start between 20% and 80% horizontally

            releaseAnimationArea.appendChild(p);
            letGoInput.value = ''; // Clear input

            // Remove the element after animation finishes (3s duration)
            setTimeout(() => {
                p.remove();
            }, 3000);
        }
    });

     // Save Partner Qualities Button
     savePartnerQualitiesButton.addEventListener('click', () => {
        localStorage.setItem('partnerNonNegotiable', partnerNonNegotiable.value);
        localStorage.setItem('partnerGoodDay', partnerGoodDay.value);
        partnerSaveStatus.textContent = 'Profile ideas saved locally!';
        setTimeout(() => { partnerSaveStatus.textContent = ''; }, 3000);
    });

    // Generate Conversation Starter Button
    const conversationStarters = [
        "What's been the highlight of your week so far?",
        "Working on anything exciting lately?",
        "Read any good books or seen any interesting movies recently?",
        "What's your favorite thing about this [place/event]?",
        "Do you have any fun plans for the weekend?",
        "Tried any new restaurants or cafes around here?",
        "What kind of music are you into?",
        "Hi, I'm Tolga. How's your day going?",
        "What's something you're passionate about?",
        "If you could travel anywhere right now, where would you go?"
    ];

    generateStarterButton.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * conversationStarters.length);
        conversationStarterOutput.textContent = conversationStarters[randomIndex];
    });

     // Save Weekly Goals Checkbox State on Change
     goalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            localStorage.setItem(`goal_${checkbox.value}`, checkbox.checked);
            goalsSaveStatus.textContent = 'Goal progress saved!';
             setTimeout(() => { goalsSaveStatus.textContent = ''; }, 2000);
        });
    });

    // --- End of DOMContentLoaded ---
});
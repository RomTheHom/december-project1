const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innertext = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeID = option.nextText
    if (nextTextNodeID <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeID)
}

const textNodes = [
    {
        id: 1,
        text:'Welcome, young...er..old trainer. Pick your starter Pokemon!',
        options: [
            {
                text: 'Pick Treecko',
                setState: { treecko: true },
                nextText: 2
            },
            {
                text: 'Pick Torchic',
                setState: { torchic: true },
                nextText: 2
            },
            {
                text: 'Pick Mudkip',
                setState: { mudkip: true },
                nextText: 2
            },
            {
                text: 'None',
                setState: { none: true },
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Oh, watch out! There is a wild Poochyena attacking you! What should you do?',
        options: [
            {
                text: '*Tell Treecko to use Pound.*',
                requiredState: (currentState) => currentState.treecko,
                nextText: 3
            },
            {
                text: '*Tell Treecko to use Absorb.*',
                requiredState: (currentState) => currentState.treecko,
                nextText: 4
            },
            {
                text: '*Tell Treecko to use Hyper Beam.*',
                requiredState: (currentState) => currentState.treecko,
                nextText: 5
            },
            {
                text: '*Tell Torchic to use Scratch.*',
                requiredState: (currentState) => currentState.torchic,
                nextText: 3
            },
            {
                text: '*Tell Torchic to use Ember.*',
                requiredState: (currentState) => currentState.torchic,
                nextText: 4
            },
            {
                text: '*Tell Torchic to use Hyper Beam.*',
                requiredState: (currentState) => currentState.torchic,
                nextText: 5
            },
            {
                text: '*Tell Mudkip to use Tackle.*',
                requiredState: (currentState) => currentState.mudkip,
                nextText: 3
            },
            {
                text: '*Tell Mudkip to use Water Gun.*',
                requiredState: (currentState) => currentState.mudkip,
                nextText: 4
            },
            {
                text: '*Tell Mudkip to use Hyper Beam.*',
                requiredState: (currentState) => currentState.mudkip,
                nextText: 5
            },
            {
                text: '*You have no Pokemon.*',
                requiredState: (currentState) => currentState.none,
                nextText: 6
            }
        ]
    },
    {
        id: 3,
        text: 'The light attack hit the Pokemon, and it ran away. You saved the professor! You then wake up from your dream and go to get your Pokemon from the professor.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 4,
        text: 'The elemental attack hit the Pokemon, and it limped away injured. You saved the professor! You then wake up from your dream and go to get your Pokemon from the professor.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'The attack compleately eradicated the Pokemon, leaving nothing left. You saved the professor! You then wake up from your dream and go to get your Pokemon from the professor. Is this...a nightmare loop?',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'With no Pokemon to defend you, the Poochyena rips you and the professor to shreds using Crunch. The failed trainer then wakes up from their dream and look at you, Robert Chamberlain. Help me....mate...',
        options: [
            {
                text: 'Force them to relive this.',
                nextText: -1
            }
        ]
    },
    
]

startGame()
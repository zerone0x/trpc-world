import { NextRequest, NextResponse } from 'next/server'

const narrativeResponses = [
  "The void responds to your words, and reality begins to shift around you. You feel the weight of possibility as new paths emerge from the darkness.",
  "Your intent resonates through the fabric of this world. The AI Game Master processes your action, weaving it into the grand tapestry of your story.",
  "The universe acknowledges your presence. Something stirs in the distance - whether friend or foe, opportunity or danger, remains to be seen.",
  "Your words have power here. The world reshapes itself to accommodate your will, though the consequences may not be immediately apparent.",
  "The eternal dance between player and world continues. Your action creates ripples that will echo through both space and time.",
  "Reality bends around your decision. The AI considers the implications, the connections, the story threads that must now be woven together.",
  "You sense other presences in this infinite space - other players crafting their own narratives. Your paths may soon intertwine.",
  "The game master's invisible hand guides events in response to your choice. What seemed simple becomes complex, what was certain becomes fluid."
]

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json()
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    // Select a random narrative response
    const narrative = narrativeResponses[Math.floor(Math.random() * narrativeResponses.length)]
    
    return NextResponse.json({
      narrative,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error processing action:', error)
    return NextResponse.json(
      { 
        narrative: "The void flickers with uncertainty. The Game Master seems distracted by cosmic forces beyond comprehension. Try speaking again.",
        error: "Failed to process action"
      },
      { status: 500 }
    )
  }
}
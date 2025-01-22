import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);


export async function GET(request){
    try{
        // Perform a lightweight query to keep the connection alive
        const { data, error } = await supabase.from('portfolio_embeddings').select('id').limit(1);

        if (error){
            console.error('Supabase Keep Alive Error:', error);
            return NextResponse.json({ error: 'Supabase Keep Alive Error' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    }
    catch (error){
        console.error('Supabase Keep Alive Error:', error);
        return NextResponse.json({ error: 'Supabase Keep Alive Error', error }, { status: 500 });
    }
}

/// Nevermind bro got replaced with UptimeRobot
import { nanoid } from 'nanoid';
import { supabase } from "../supabaseClient";

export const createPage = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const slug = nanoid();
    const user = userData.user;
    if (!user) {
        throw new Error("You must be logged in to create a page");
    }    
    const page = {
        title: "Untitled",
        id: undefined,
        slug,
        nodes: [],
        created_at: new Date().toISOString()
    };
    
    await supabase.from("pages").insert(page);
    const { data: pageData } = await supabase
        .from("pages")
        .select("id")
        .match({ slug, created_by: user.id })
        .single();
    
    page.id = pageData?.id;
    
    return page;
};
import {KlasaClient, KlasaGuild, KlasaUser, PermissionLevels} from "klasa";
import {Permissions} from 'discord.js';
import {Permission} from "../enum/Permission";
import {GuildMember} from "discord.js";

KlasaClient.defaultPermissionLevels = new PermissionLevels()
    .add(Permission.Default, () => true)

    // @ts-ignore
    .add(Permission.Kick, ({guild, member}: PermissionsLevelGuildMember) => guild && member.permissions.has(Permissions.FLAGS.KICK_MEMBERS), {fetch: true})
    .add(Permission.Ban, ({guild, member}: PermissionsLevelGuildMember) => guild && member.permissions.has(Permissions.FLAGS.BAN_MEMBERS), {fetch: true})
    .add(Permission.ManageGuild, ({guild, member}: PermissionsLevelGuildMember) => guild && member.permissions.has(Permissions.FLAGS.MANAGE_GUILD), {fetch: true})
    .add(Permission.Administrator, ({guild, member}: PermissionsLevelGuildMember) => guild && member.permissions.has(Permissions.FLAGS.ADMINISTRATOR), {fetch: true})
    .add(Permission.GuildOwner, ({guild, member}: PermissionsLevelGuildMember) => guild && member === guild.owner, {fetch: true})

    // @ts-ignore
    .add(8, ({author, client}: PermissionsLevelAuthorClient) => {
        // @ts-ignore
        const member = client.guilds.get('594975995178778644').member(author.id);
        if (!member) return false;
        const map = member.roles.map(r => ['Moderators', 'Admins'].includes(r.name));
        return map.includes(true);
    }, {fetch: true})

    .add(9, ({author, client}: PermissionsLevelAuthorClient) => client.owners.has(author), {break: true})
    .add(10, ({author, client}: PermissionsLevelAuthorClient) => client.owners.has(author));

interface PermissionsLevelAuthorClient {
    author: KlasaUser,
    client: KlasaClient
}

interface PermissionsLevelGuildMember {
    guild: KlasaGuild,
    member: GuildMember
}